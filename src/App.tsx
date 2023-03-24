import { Layout } from "antd";
import Menu from "./components/Menu/Menu";
import QuestionCard from "./components/Card/QuestionCard";
import { useStore } from "effector-react";
import { $card } from "./components/Card/store/model";
import "./styles/App.scss";
import { useEffect } from "react";
import { getQuestionEvent, getQuestionFx } from "./api/questions";
import Loader from "./components/loader/Loader";

const { Content } = Layout;

const App: React.FC = () => {
  const cardStore = useStore($card);

  console.log(`cardStore in APP `, cardStore);

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
