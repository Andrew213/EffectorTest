import { createStore } from "effector";

type gameStoreT = {
  difficult: number;
  isStarted: boolean;
};

const $gameStore = createStore<gameStoreT | null>(null);
