import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { CardStoreT, getQuestionFx } from "../../../api/questions";
import {
  fadeInFx,
  fadeOutFx,
  shakeXFx,
  tadaFx,
} from "../../../stores/animationEffects";

export const $card = createStore<CardStoreT[] | []>([]);

export const showGate = createGate<string>();

export type onSelectAnswerT = {
  answer: string;
  buttonClass: string;
};

export const onSelectAnswer = createEvent<onSelectAnswerT>();

const checkAnswerFx = createEffect((props: onSelectAnswerT) => {
  const cardStore = $card.getState()[0];

  const currentBtn = document.querySelector(`.${props.buttonClass}`);

  if (cardStore.correctAnswer === props.answer) {
    console.log(`correct`);
    tadaFx(props.buttonClass);
    return;
  }
  console.log(`props.buttonClass `, props.buttonClass);
  shakeXFx(props.buttonClass);
  return;
  // console.log(`currentBtn `, currentBtn);
  // console.log(`cardStore `, cardStore);
  // console.log(`props `, props);
});

sample({
  clock: showGate.open,
  target: fadeInFx,
});
sample({
  clock: onSelectAnswer,
  target: checkAnswerFx,
});

sample({
  clock: getQuestionFx.doneData,
  fn(clk) {
    return clk.map((data: CardStoreT) => ({
      ...data,
      correctAnswer: data.answers[0],
    }));
  },
  target: $card,
});
