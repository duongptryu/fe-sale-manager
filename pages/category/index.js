import { Row, Typography, Col, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LayoutC from "../../components/layout/layout";
import PopupCreateCategory from "../../components/category/popupCreate";
import PopupUpdateCategory from "../../components/category/popupUpdate";
import { connect } from "react-redux";
import {
  ACT_CHANGE_CREATE_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_VISIBLE_STATE,
} from "../../redux/action/category";

const { Title } = Typography;

const Category = (props) => {
  const { onChangeVisibleCreate, onChangeVisibleUpdate } = props;
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Cập nhật",
      key: "btn-update",
      render: (data) => {
        return (
          <Button type="primary" size="small">
            Sửa
          </Button>
        );
      },
    },
  ];

  const dataSource = [
    {
      id: "1",
      name: "Mike",
      created_at: 32,
      updated_at: "10 Downing Street",
    },
    {
      id: "2",
      name: "John",
      created_at: 42,
      updated_at: "10 Downing Street",
    },
  ];

  const handleCreateBtn = () => {
    onChangeVisibleCreate(true);
  };

  const handleUpdateBtn = () => {
    onChangeVisibleUpdate(true);
  };

  return (
    <LayoutC one="Loại Hàng">
      <div
        className="site-layout-background"
        style={{
          padding: 24,
        }}
      >
        <Row style={{ marginBottom: "10px" }}>
          <Col span={12}>
            <Title level={3}>Bảng thống kê các loại hàng</Title>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              size="large"
              style={{ float: "right" }}
              icon={<PlusOutlined />}
              onClick={handleCreateBtn}
            >
              Thêm
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
      <PopupCreateCategory />
      <PopupUpdateCategory />
    </LayoutC>
  );
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleCreate: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_VISIBLE_STATE, payload }),
  onChangeVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_VISIBLE_STATE, payload }),
});

export default connect(null, mapDispatchToProp)(Category);
