import { Button, Col, Input, Row, Space, Spin, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import LayoutC from "../../components/layout/layout";
import PopupCreateSeller from "../../components/seller/popupCreateSeller";
import PopupUpdateSeller from "../../components/seller/popupUpdateSeller";
import {
  ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE,
} from "../../redux/action/seller";
import { useState } from "react";
import { useRouter } from "next/router";

const { Title } = Typography;

const Seller = (props) => {
  const { onChangeSellerVisibleCreate, onChangeSellerVisibleUpdate } = props;
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
  });
  const Router = useRouter();

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
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
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
          <>
            <Button
              type="primary"
              size="small"
              onClick={() => handleUpdateBtn(data)}
              style={{
                marginRight: "10px",
              }}
            >
              Sửa
            </Button>
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => {
                Router.push(`/seller/${data.id}`);
              }}
            >
              Xem
            </Button>
          </>
        );
      },
    },
  ];

  const dataSource = [
    {
      id: "1",
      name: "Mike",
      phone_number: "0969360916",
      note: "abcxyz",
      created_at: 32,
      updated_at: "10 Downing Street",
    },
    {
      id: "2",
      name: "John",
      phone_number: "0969360916",
      note: "abcxyz",
      created_at: 42,
      updated_at: "10 Downing Street",
    },
  ];

  const handleCreateBtn = () => {
    onChangeSellerVisibleCreate(true);
  };

  const handleUpdateBtn = (data) => {
    onChangeSellerVisibleUpdate({
      status: true,
      user: data,
    });
  };

  return (
    <LayoutC one={"/ Nhập hàng"} two="Người bán">
      <Spin spinning={loading}>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            marginBottom: 10,
          }}
        >
          <Row>
            <Col offset={10}>
              <Title>Tìm kiếm</Title>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Input placeholder="Nhập tên" size="large" />
            </Col>
            <Col span={8} offset={1}>
              <Input placeholder="Nhập số điện thoại" size="large" />
            </Col>
            <Col span={6} offset={1} style={{ float: "right" }}>
              <Space>
                <Button size="large" type="primary">
                  Tìm kiếm
                </Button>
                <Button size="large" type="primary">
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
          }}
        >
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Title level={3}>Bảng hiển thị người bán</Title>
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
                pagination={pagination}
              />
            </Col>
          </Row>
        </div>
        <PopupCreateSeller />
        <PopupUpdateSeller />
      </Spin>
    </LayoutC>
  );
};

const mapDispatchToProp = (dispath) => ({
  onChangeSellerVisibleCreate: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE, payload }),
  onChangeSellerVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE, payload }),
});

export default connect(null, mapDispatchToProp)(Seller);
