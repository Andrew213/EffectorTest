import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { fadeInFx, fadeOutFx } from "../../../animationEffects";
import { CardStoreT, getQuestionFx } from "../../../api/questions";

export const $card = createStore<CardStoreT[] | null>(null);

export const cartGate = createGate<string>();

sample({
  clock: cartGate.open,
  target: fadeInFx,
});

getQuestionFx.doneData.watch((her) => {
  console.log(`done `, her);
});

sample({
  clock: fadeOutFx.done,
  source: getQuestionFx.doneData,
  fn: (getQuestionFx: CardStoreT[]) => {
    return getQuestionFx ?? null;
  },
  target: $card,
});
