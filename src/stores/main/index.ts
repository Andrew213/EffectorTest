import { createEvent, createStore, sample } from "effector";
import { getQuestionFx } from "../../api/questions";
import { fadeOutFx } from "../animationEffects";

export type gameSettingsT = {
  correctCount?: number;
  incorrectCount?: number;
  restart?: boolean;
  difficult: number;
  count?: number;
};

export const $game = createStore<gameSettingsT>({ difficult: 1 });

export const setGameSettings = createEvent<gameSettingsT>();

sample({
  clock: fadeOutFx.done,
  source: $game,
  fn: (source) => {
    return source;
  },
  target: getQuestionFx,
});

sample({
  clock: setGameSettings,
  fn(clk) {
    return {
      difficult: clk.difficult,
      count: clk.count,
    };
  },
  target: $game,
});
