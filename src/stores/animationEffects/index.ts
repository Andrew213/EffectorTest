import { createEffect } from "effector";
import { tween } from "shifty";
import { DataFromFn } from "../../components/Menu/store/model";

export const fadeInFx = createEffect(async (classNameMenu: string) => {
  const target = document.querySelector(`.${classNameMenu}`) as HTMLElement;

  await tween({
    render: (props) => {
      target.style.opacity = props.opacity;
      target.style.scale = props.scale;
      target.style.display = props.display;
    },
    easing: "easeFromTo",
    duration: 700,
    to: { display: 1, opacity: 1, scale: 1 },
    from: { display: 0, opacity: 0, scale: 0 },
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
    duration: 800,
    from: { opacity: 1, transform: `scale3d(1, 1, 1)` },
    to: { opacity: 0, transform: `scale3d(0, 0, 0)` },
  }).then();
  target.style.display = "none";

  return true;
});

export const shakeXFx = createEffect(async (classNameBtn: string) => {
  const target = document.querySelector(`.${classNameBtn}`) as HTMLElement;

  target.classList.remove("button--hover");

  target.classList.add("shakeX");

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(target.classList.remove("shakeX"));
    }, 1000)
  );
});

export const tadaFx = createEffect(async (classNameBtn: string) => {
  const target = document.querySelector(`.${classNameBtn}`) as HTMLElement;

  target.classList.remove("button--hover");

  target.classList.add("tada");

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(target.classList.remove("tada"));
    }, 1000)
  );
});

// fadeOutFx.done.watch((params) => {
//   console.log(`fadeOut done`, params);
// });

// tadaFx.done.watch((params) => {
//   console.log(`tadaFx done`, params);
// });

// shakeXFx.done.watch((params) => {
//   console.log(`shakeXFx done`, params);
// });

export const fadeOutEvent = fadeOutFx.prepend((params: DataFromFn) => {
  return params.params;
});
