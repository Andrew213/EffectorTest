import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { tween } from "shifty";

type settingsT = {
  difficult: 1 | 2 | 3 | 4;
};

const menuGate = createGate<string>();

const menuButtonClicked = createEvent<string>();

const $menuClass = createStore<string>("menu").reset(menuButtonClicked);

const fadeInFx = createEffect(async (classNameMenu: string) => {
  const target = document.querySelector(`.${classNameMenu}`) as HTMLElement;

  await tween({
    render: (props) => {
      target.style.opacity = props.opacity;
      target.style.transform = props.transform;
    },
    easing: "easeFromTo",
    duration: 2000,
    to: { opacity: 1, transform: `scale3d(1, 1, 1)` },
    from: { opacity: 0, transform: `scale3d(0, 0, 0)` },
  }).then();
});

const $btnClass = createStore<string>("menu__listBtn");

menuGate.open.watch((props) => {
  console.log(`gate `, props);
});

sample({
  clock: menuGate.open,
  // source: $menuClass,
  // fn(store, payload) {},
  target: fadeInFx,
});

export { $menuClass, menuGate, $btnClass, menuButtonClicked };
