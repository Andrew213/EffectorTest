import { createEvent, createStore } from "effector";

const setError = createEvent<{ error: string }>();
export const $errorStore = createStore<{ error: string } | null>(null).on(
  setError,
  (store, payload) => payload
);
