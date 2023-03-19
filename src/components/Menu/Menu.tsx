import { Button, Typography } from "antd";
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { useGate, useStore } from "effector-react";
import "./styles.scss";
import * as model from "./store/model";
import { getQuestionEvent } from "../../api/questions";
import { fadeOutFx } from "../../animationEffects";

type menuItemT = {
  title: string;
  difficult: 1 | 2 | 3 | 4;
};

const menuItems: menuItemT[] = [
  {
    title: "Детские",
    difficult: 4,
  },
  {
    title: "Лёгкие",
    difficult: 1,
  },
  {
    title: "Средние",
    difficult: 2,
  },
  {
    title: "Сложные",
    difficult: 3,
  },
];

const Menu: React.FC = () => {
  useGate(model.menuGate, "menu");

  const disableMenuBtn = useStore(fadeOutFx.pending);

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
                  className="menu__button"
                  onClick={() =>
                    model.menuButtonClicked({ difficult: menuItem.difficult })
                  }
                >
                  {menuItem.title}
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
