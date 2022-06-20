import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Spin,
  notification,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { ACT_AUTHEN_LOGIN_REQUEST } from "../../redux/action/auth";
import { getToken } from "../../services/utils/const";
const { Title } = Typography;
const { Header, Content } = Layout;

const LoginForm = (props) => {
  const router = useRouter();
  useEffect(() => {
    if (getToken() != "") {
      router.push("/dashboard");
    }
  });

  const { token, onLogin, err, loading } = props;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    onLogin({
      username: username,
      password: password,
    });
  };

  useEffect(() => {
    if (err == "") {
      return;
    } else {
      notification.error({
        message: err,
        duration: 2,
      });
    }
  }, [err]);
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          {/* <div className="header-col header-brand">
            <h5>Foodlive admin</h5>
          </div> */}
        </Header>
        <Content className="signin">
          <Spin spinning={loading}>
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Nhập tên đăng nhập và mật khẩu
                </Title>
                <Form
                  // onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                    ]}
                  >
                    <Input
                      value={username}
                      placeholder="Tên đăng nhập"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                      },
                    ]}
                  >
                    <Input
                      value={password}
                      placeholder="Password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      // loading={loading}
                      onClick={handleLogin}
                    >
                      ĐĂNG NHẬP
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                {/* <img src={signinbg} alt="" /> */}
              </Col>
            </Row>
          </Spin>
        </Content>
      </Layout>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    token: state.authen.token,
    loading: state.authen.loading,
    err: state.authen.err,
  };
};

const mapDispatchToProp = (dispath) => ({
  onLogin: (payload) => dispath({ type: ACT_AUTHEN_LOGIN_REQUEST, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(LoginForm);
