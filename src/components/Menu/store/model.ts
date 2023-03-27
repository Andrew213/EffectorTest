import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { fadeInFx, fadeOutEvent } from "../../../stores/animationEffects";
import { gameSettingsT, setGameSettings } from "../../../stores/main";

export const menuGate = createGate<string>();

export const menuButtonClicked =
  createEvent<
    Omit<gameSettingsT, "correctCount" | "incorrectCount" | "answersDisabled">
  >();

sample({
  clock: menuGate.open,
  target: fadeInFx,
});

export type DataFromFn = Omit<
  gameSettingsT,
  "correctCount" | "incorrectCount"
> & {
  params: string;
  result: any;
};

sample({
  clock: menuButtonClicked,
  source: fadeInFx.done,
  fn: (fadeInFxParams, buttonClickParams) => {
    return { ...fadeInFxParams, ...buttonClickParams } as DataFromFn;
  },
  target: [fadeOutEvent, setGameSettings],
});
