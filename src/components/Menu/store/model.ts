import { createEvent, sample } from "effector";
import { createGate } from "effector-react";
import { fadeInFx, fadeOutEvent } from "../../../animationEffects";
import { getQuestionEvent } from "../../../api/questions";

export type settingsT = {
  difficult: 1 | 2 | 3 | 4;
  count?: 1 | 2 | 3 | 4 | 5;
};

export const menuGate = createGate<string>();

export const menuButtonClicked = createEvent<settingsT>();

sample({
  clock: menuGate.open,
  target: fadeInFx,
});

export type DataFromFn = settingsT & { params: string; result: any };

sample({
  clock: menuButtonClicked,
  source: fadeInFx.done,
  fn: (fadeInFxParams, buttonClickParams) => {
    return { ...fadeInFxParams, ...buttonClickParams };
  },
  target: [fadeOutEvent, getQuestionEvent],
});
