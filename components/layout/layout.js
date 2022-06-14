import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import MenuKey from "./menu";
import { useRouter } from "next/router";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", MenuKey.Dashboard.key, <PieChartOutlined />),
  getItem("Loại Hàng", MenuKey.Category.key, <DesktopOutlined />),
  getItem("Quản lý nhập hàng", "sub1", <UserOutlined />, [
    getItem("Khách hàng", MenuKey.Seller.key),
    getItem("Nhập hàng theo ngày", MenuKey.Order.key),
    getItem("Lịch sử thanh toán", MenuKey.HistoryPayment.key),
  ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

const LayoutC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const Router = useRouter();

  const handleClickMenu = (e) => {
    switch (e.key) {
      case MenuKey.Dashboard.key:
        return Router.push(MenuKey.Dashboard.link);
      case MenuKey.Category.key:
        return Router.push(MenuKey.Category.link);
      case MenuKey.Seller.key:
        return Router.push(MenuKey.Seller.link);
      case MenuKey.Order.key:
        return Router.push(MenuKey.Order.link);
      case MenuKey.HistoryPayment.key:
        return Router.push(MenuKey.HistoryPayment.link);
      default:
        return Router.push(MenuKey.Dashboard.link);
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo">
          <Image src="/logo.png" width={200} height={65} />
        </div>
        <Menu
          onClick={handleClickMenu}
          theme="dark"
          // defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{props.one}</Breadcrumb.Item>
            <Breadcrumb.Item>{props.two}</Breadcrumb.Item>
          </Breadcrumb>
          {/* <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          > */}
          {props.children}
          {/* </div> */}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutC;
