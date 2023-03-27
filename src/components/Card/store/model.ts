import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { getQuestionFx } from "../../../api/questions";
import { fadeInFx } from "../../../stores/animationEffects";

export interface CardStoreT {
  question: string;
  answers: { answer: string; id: string }[];
  correctAnswer: string;
  answersDisabled: boolean;
  id: number;
}

export const $card = createStore<CardStoreT[]>([]);

export const showGate = createGate<string>();

export type onSelectAnswerT = {
  answer: string;
  buttonClass: string;
};

export const onSelectAnswer = createEvent<onSelectAnswerT>();

export const onCorrectAnswer = createEvent<any>();
export const onIncorrectAnswer = createEvent<string>();

const checkAnswerFx = createEffect((props: onSelectAnswerT) => {
  const cardStore = $card.getState()[0];
  if (cardStore.correctAnswer === props.answer) {
    onCorrectAnswer(props.buttonClass);
    return;
  }
  onIncorrectAnswer(props.buttonClass);
  return;
});

sample({
  clock: showGate.open,
  target: fadeInFx,
});
sample({
  clock: onSelectAnswer,
  source: $card,
  fn(src) {
    return [{ ...src[0], answersDisabled: true }];
  },
  target: $card,
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
      correctAnswer: data.answers[0] as unknown as string,
    }));
  },
  target: $card,
});
