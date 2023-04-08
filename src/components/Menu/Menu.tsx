import { Button, Tooltip, Typography } from "antd";

import cn from "classnames";
import { useGate, useStore } from "effector-react";
import "./styles.scss";
import * as model from "./store/model";
import { fadeOutFx } from "../../stores/animationEffects";
import { useState } from "react";

type menuItemT = {
  title: string;
  difficult: 1 | 2 | 3 | 4;
  tooltip: string;
  timer: 8 | 6 | 4;
};

const menuItems: menuItemT[] = [
  {
    title: "Детские",
    difficult: 4,
    timer: 4,
    get tooltip() {
      return `Время на ответ: ${this.timer} сек.`;
    },
  },
  {
    title: "Лёгкие",
    difficult: 1,
    timer: 4,
    get tooltip() {
      return `Время на ответ: ${this.timer} сек.`;
    },
  },
  {
    title: "Средние",
    difficult: 2,
    timer: 6,
    get tooltip() {
      return `Время на ответ: ${this.timer} сек.`;
    },
  },
  {
    title: "Сложные",
    difficult: 3,
    timer: 8,
    get tooltip() {
      return `Время на ответ: ${this.timer} сек.`;
    },
  },
];

const Menu: React.FC = () => {
  useGate(model.menuGate, "menu");

  const disableMenuBtn = useStore(fadeOutFx.pending);

  const [hideTooltip, setHideTooltip] = useState<boolean>(false);

  return (
    <div className="menu">
      <Typography.Title style={{ fontSize: 25 }}>
        Выбери сложность вопросов
      </Typography.Title>
      <div className="menu">
        <ul className="menu__list">
          {menuItems.map((menuItem) => {
            return (
              <li className="menu__listItem" key={menuItem.difficult}>
                <Button
                  disabled={disableMenuBtn}
                  className={cn("menu__button", "button--hover")}
                  onClick={() => {
                    model.menuButtonClicked({
                      settings: {
                        difficult: menuItem.difficult,
                        timer: menuItem.timer,
                      },
                    });
                    setHideTooltip(true);
                  }}
                >
                  <Tooltip
                    title={menuItem.tooltip}
                    placement="right"
                    open={hideTooltip ? false : undefined}
                  >
                    {menuItem.title}
                  </Tooltip>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
