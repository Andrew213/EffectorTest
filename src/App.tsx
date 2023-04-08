import { Layout } from "antd";
import Menu from "./components/Menu/Menu";
import QuestionCard from "./components/Card/QuestionCard";
import { useUnit } from "effector-react";
import { $card } from "./components/Card/store/model";
import "./styles/App.scss";
import ScoreBlock from "./components/scoreBlock/ScoreBlock";
import { $game } from "./stores/main";

const { Content } = Layout;

const App: React.FC = () => {
  const [cardStore, gameStore] = useUnit([$card, $game]);

  return (
    <>
      <Layout style={{ backgroundColor: "transparent" }}>
        <Content className="content">
          {gameStore.start && <ScoreBlock />}
          {!!cardStore?.length && <QuestionCard />}
          <Menu />
        </Content>
      </Layout>
    </>
  );
};

export default App;
