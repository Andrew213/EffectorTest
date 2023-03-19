import { Layout } from "antd";
import Menu from "./components/Menu/Menu";
import QuestionCard from "./components/Card/QuestionCard";
import { useStore } from "effector-react";
import { getQuestionFx } from "./api/questions";
import { $card } from "./components/Card/store/model";
import "./styles/App.scss";

const { Content } = Layout;

const App: React.FC = () => {
  // const loading = useStore(getQuestionFx.pending);

  const cardStore = useStore($card);

  // console.log(`loading `, loading);

  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      <Content className="content">
        {/* {loading && <Loader />} */}
        {/* <ScoreBlock /> */}
        {cardStore?.length && <QuestionCard />}

        <Menu />
      </Content>
    </Layout>
  );
};

export default App;
