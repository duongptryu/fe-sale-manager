import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import "antd/dist/antd.css";
import "../styles/globals.css";
import { Layout, Menu } from "antd";
import Image from "next/image";
import Sider from "antd/lib/layout/Sider";
import { useState } from "react";
import { useRouter } from "next/router";
import MenuKey from "../components/layout/menu";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
      case MenuKey.HistoryPayment.key:
        return Router.push(MenuKey.HistoryPayment.link);
      default:
        return Router.push(MenuKey.Dashboard.link);
    }
  };

  return (
    <Provider store={store}>
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
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
