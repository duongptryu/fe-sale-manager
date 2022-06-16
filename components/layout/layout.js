import React, { useEffect } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import { useRouter } from "next/router";
import { getToken } from "../../services/utils/const";
const { Header, Content, Footer } = Layout;

const LayoutC = ({ children, one, two }) => {
  const Router = useRouter();

  useEffect(() => {
    if (getToken() == "") {
      Router.push("/auth/login");
    }
  }, []);

  return (
    <>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>{one}</Breadcrumb.Item>
          <Breadcrumb.Item>{two}</Breadcrumb.Item>
          {/* <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div className="site-layout-content"> {children}</div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      ></Footer>
    </>
  );
};

export default LayoutC;
