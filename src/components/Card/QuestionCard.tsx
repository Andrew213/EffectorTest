import { Button, Card } from "antd";
import classNames from "classnames";
import { useGate, useStore } from "effector-react";
import { v4 as uuidv4 } from "uuid";
import shuffleArray from "../../utils/shuffleArray";
import * as model from "./store/model";
import "./styles.scss";

const QuestionCard: React.FC = () => {
  const cardStore = useStore(model.$card);

  useGate(model.showGate, "cardWrapper");

  const answers = shuffleArray<string>(cardStore[0].answers);

  return (
    <div className="cardWrapper">
      <Card
        title={cardStore[0].question}
        className="card"
        bodyStyle={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="card__wrapperBtn">
          {answers.slice(0, 2).map((answer) => {
            const btnUid = uuidv4();
            return (
              <Button
                size="large"
                onClick={() =>
                  model.onSelectAnswer({
                    answer,
                    buttonClass: `card__button--${btnUid}`,
                  })
                }
                className={classNames(
                  "card__button",
                  "button--hover",
                  `card__button--${btnUid}`
                )}
                key={btnUid}
              >
                {answer}
              </Button>
            );
          })}
        </div>
        <div className="card__wrapperBtn">
          {answers.slice(2, 4).map((answer) => {
            const btnUid = uuidv4();
            return (
              <Button
                size="large"
                onClick={() =>
                  model.onSelectAnswer({
                    answer,
                    buttonClass: `card__button--${btnUid}`,
                  })
                }
                className={classNames(
                  "card__button",
                  "button--hover",
                  `card__button--${btnUid}`
                )}
                key={btnUid}
              >
                {answer}
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default QuestionCard;
