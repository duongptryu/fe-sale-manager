import { Breadcrumb, Layout } from "antd";
const { Header, Content, Footer } = Layout;

const LayoutC = (props) => {
  return (
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
  );
};

export default LayoutC;
