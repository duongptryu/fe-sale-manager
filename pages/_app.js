import "antd/dist/antd.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { Avatar, Badge, Col, Layout, Menu, Row } from "antd";
import Image from "next/image";
import Sider from "antd/lib/layout/Sider";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuKey from "../components/layout/menu";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Header } from "antd/lib/layout/layout";
import { getToken } from "../services/utils/const";

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
  ]),
  getItem("Đăng xuất", MenuKey.Logout.key, <UserOutlined />),
];

function MyApp({ Component, pageProps }) {
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
      case MenuKey.Logout.key:
        MenuKey.Logout.handle();
        return Router.push("/auth/login");
      default:
        return Router.push(MenuKey.Dashboard.link);
    }
  };

  return (
    <Provider store={store}>
      <Layout className="layout">
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu
            onClick={handleClickMenu}
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={["2"]}
            items={items}
          />
        </Header>

        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
