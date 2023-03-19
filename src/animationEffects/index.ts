import { createEffect } from "effector";
import { tween } from "shifty";
import { DataFromFn } from "../components/Menu/store/model";

export const fadeInFx = createEffect(async (classNameMenu: string) => {
  const target = document.querySelector(`.${classNameMenu}`) as HTMLElement;
  console.log(`fadeIn `, target);

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

export const fadeOutFx = createEffect(async (classNameMenu: string) => {
  const target = document.querySelector(`.${classNameMenu}`) as HTMLElement;

  await tween({
    render: (props) => {
      target.style.opacity = props.opacity;
      target.style.transform = props.transform;
    },
    easing: "swingFromTo",
    duration: 1000,
    from: { opacity: 1, transform: `scale3d(1, 1, 1)` },
    to: { opacity: 0, transform: `scale3d(0, 0, 0)` },
  }).then();
  target.style.display = "none";

  return true;
});

export const fadeOutEvent = fadeOutFx.prepend((params: DataFromFn) => {
  return params.params;
});
