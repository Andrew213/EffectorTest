import { createEvent, createStore, sample } from "effector";
import { getQuestionFx } from "../../api/questions";
import {
  onCorrectAnswer,
  onIncorrectAnswer,
} from "../../components/Card/store/model";
import { fadeOutFx, shakeXFx, tadaFx } from "../animationEffects";

export type gameSettingsT = {
  correctCount?: number;
  incorrectCount?: number;
  restart?: boolean;
  settings: {
    difficult: 1 | 2 | 3 | 4;
    timer?: 8 | 6 | 4;
  };
  count?: number;
  start: boolean;
};

export const $game = createStore<gameSettingsT>({
  settings: {
    difficult: 1,
  },
  correctCount: 0,
  incorrectCount: 0,
  start: false,
});

console.log(`game `, $game);

export const setGameSettings = createEvent<gameSettingsT>();

// остановился тут, придумать, как разделить 2 таргета по клику на на верный и неверный ответ

sample({
  clock: onCorrectAnswer,
  target: tadaFx,
});

sample({
  clock: onCorrectAnswer,
  source: $game,
  fn(source) {
    return {
      ...source,
      correctCount: source.correctCount ? source.correctCount + 1 : 1,
    };
  },
  target: $game,
});

sample({
  clock: onIncorrectAnswer,
  target: shakeXFx,
});

sample({
  clock: onIncorrectAnswer,
  source: $game,
  fn(source) {
    return {
      ...source,
      incorrectCount: source.incorrectCount ? source.incorrectCount + 1 : 1,
    };
  },
  target: $game,
});

sample({
  clock: [shakeXFx.done, tadaFx.done],
  fn(clk) {
    return "cardWrapper";
  },
  target: fadeOutFx,
});

sample({
  clock: fadeOutFx.done,
  source: $game,
  fn: (source) => {
    return { ...$game.getState(), ...source };
  },
  target: getQuestionFx,
});

sample({
  clock: setGameSettings,
  fn(clk) {
    const currentState = $game.getState();
    return {
      ...currentState,
      settings: clk.settings,
      count: clk.count,
      start: true,
    };
  },
  target: $game,
});
