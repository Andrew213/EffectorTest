import { Button, Card } from "antd";
import classNames from "classnames";
import { useGate, useStore } from "effector-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import shuffleArray from "../../utils/shuffleArray";
import * as model from "./store/model";
import "./styles.scss";

const QuestionCard: React.FC = () => {
  const cardStore = useStore(model.$card);

  const [shuffledAnswers, setShuffledAnswers] = useState<
    { answer: string; id: string }[]
  >([]);

  useGate(model.showGate, "cardWrapper");

  useEffect(() => {
    const answers = shuffleArray<string>(
      cardStore[0].answers as unknown as string[]
    );
    setShuffledAnswers(
      answers.map((answer) => {
        const btnUid = uuidv4();
        return { answer, id: btnUid };
      })
    );
  }, []);

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
          {shuffledAnswers.slice(0, 2).map(({ answer, id }) => {
            return (
              <Button
                size="large"
                disabled={cardStore[0].answersDisabled}
                onClick={() => {
                  model.onSelectAnswer({
                    answer,
                    buttonClass: `card__button--${id}`,
                  });
                }}
                className={classNames(
                  "card__button",
                  "button--hover",
                  `card__button--${id}`
                )}
                key={id}
              >
                {answer}
              </Button>
            );
          })}
        </div>
        <div className="card__wrapperBtn">
          {shuffledAnswers.slice(2, 4).map(({ answer, id }) => {
            console.log(`1`);
            return (
              <Button
                disabled={cardStore[0].answersDisabled}
                size="large"
                onClick={() =>
                  model.onSelectAnswer({
                    answer,
                    buttonClass: `card__button--${id}`,
                  })
                }
                className={classNames(
                  "card__button",
                  "button--hover",
                  `card__button--${id}`
                )}
                key={id}
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
