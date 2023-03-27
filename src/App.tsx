import { Layout } from "antd";
import Menu from "./components/Menu/Menu";
import QuestionCard from "./components/Card/QuestionCard";
import { useStore } from "effector-react";
import { $card } from "./components/Card/store/model";
import "./styles/App.scss";

const { Content } = Layout;

const App: React.FC = () => {
  const cardStore = useStore($card);

  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      <Content className="content">
        {/* {loading && <Loader />} */}
        {/* <ScoreBlock /> */}
        {/* {loading && <Loader />} */}
        {cardStore?.length > 0 && <QuestionCard />}

        <Menu />
      </Content>
    </Layout>
  );
};

export default App;
