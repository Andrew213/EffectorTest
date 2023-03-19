import { Button, Card } from "antd";
import { useGate, useStore, useUnit } from "effector-react";
import * as model from "./store/model";
import "./styles.scss";

const QuestionCard: React.FC = () => {
  const cardStore = useStore(model.$card);

  useGate(model.cartGate, "cardWrapper");

  return cardStore?.length ? (
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
          {cardStore[0].answers.slice(0, 2).map((answer, index) => {
            return (
              <Button size="large" className="card__button" key={index}>
                {answer}
              </Button>
            );
          })}
        </div>
        <div className="card__wrapperBtn">
          {cardStore[0].answers.slice(2, 4).map((answer, index) => {
            return (
              <Button size="large" className="card__button" key={index}>
                {answer}
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  ) : (
    <div />
  );
};

export default QuestionCard;
