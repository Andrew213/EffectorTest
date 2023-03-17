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
import {
  $btnClass,
  $menuClass,
  menuButtonClicked,
  menuGate,
} from "./store/store";

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
  const menuClass = useStore($menuClass);
  const btnClass = useStore($btnClass);
  const menuRef = useRef<HTMLDivElement>(null);
  useGate(menuGate, "menu");

  return (
    <div className="menu" ref={menuRef}>
      <Typography.Title style={{ fontSize: 25 }}>
        Выбери сложность вопросов
      </Typography.Title>
      <div className={menuClass}>
        <ul className="menu__list">
          {menuItems.map((menuItem) => {
            return (
              <li className="menu__listItem" key={menuItem.difficult}>
                <Button
                  className={btnClass}
                  onClick={() => menuButtonClicked("animate__zoomOut")}
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
