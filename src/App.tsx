import React, { useEffect, useState } from "react";
import { Button, Layout, Space } from "antd";
import "./styles/App.scss";
import cn from "classnames";
import Menu from "./components/Menu/Menu";

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const App: React.FC = () => {
  // useEffect(() => {
  //   const foo = async () => {
  //     const response = await fetch(
  //       "https://engine.lifeis.porn/api/millionaire.php?qType=3&count=1"
  //     );
  //     const her = await response.json();
  //     console.log(`response `, her);
  //   };
  //   foo();
  // }, []);

  // const [show, setShow] = useState(false);
  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      <Content className="content">
        <Menu />
        {/* <div
        // className={cn({ animate__fadeOut: !show }, "animate__animated", {
        //   animate__fadeIn: show,
        // })}
        >
          Content
        </div> */}
      </Content>
    </Layout>
  );
};

export default App;
