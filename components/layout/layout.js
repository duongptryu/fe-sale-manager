import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Sider from "antd/lib/layout/Sider";
const { Header, Content, Footer } = Layout;

const LayoutC = ({ children, one, two }) => {
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
