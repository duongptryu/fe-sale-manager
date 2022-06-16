import { Row, Typography, Col, Table, Button, Spin, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LayoutC from "../../components/layout/layout";
import PopupCreateCategory from "../../components/category/popupCreate";
import PopupUpdateCategory from "../../components/category/popupUpdate";
import { connect } from "react-redux";
import {
  ACT_CHANGE_CREATE_CATE_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE,
  ACT_GET_CATEGORY_REQUEST,
} from "../../redux/action/category";
import { useEffect, useState } from "react";
import { getToken } from "../../services/utils/const";
import { formatDate } from "../../services/utils/number";

const { Title } = Typography;

const Category = (props) => {
  const {
    loading,
    reload,
    categories,
    err,
    noti,
    onChangeVisibleCreate,
    onChangeVisibleUpdate,
    onGetCategory,
  } = props;
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    onGetCategory({ token: getToken() });
  }, [reload]);

  useEffect(() => {
    setDataSource(categories);
  }, [categories]);

  useEffect(() => {
    if (err != "") {
      return notification.error({
        message: err,
      });
    }
  }, [err]);

  useEffect(() => {
    if (noti != "") {
      return notification.success({
        message: noti,
      });
    }
  }, [noti]);

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
      title: "Số Kg / Túi",
      dataIndex: "kg_for_bag",
      key: "name",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => {
        return formatDate(date);
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date) => {
        return formatDate(date);
      },
    },
    {
      title: "Cập nhật",
      key: "btn-update",
      render: (data) => {
        return (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              handleUpdateBtn(data);
            }}
          >
            Sửa
          </Button>
        );
      },
    },
  ];

  const handleCreateBtn = () => {
    onChangeVisibleCreate(true);
  };

  const handleUpdateBtn = (data) => {
    onChangeVisibleUpdate({
      status: true,
      category: data,
    });
  };

  return (
    <LayoutC one="Loại Hàng">
      <Spin spinning={loading}>
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
      </Spin>
    </LayoutC>
  );
};

const mapStateToProp = (state) => {
  return {
    loading: state.category.loading,
    categories: state.category.categories,
    reload: state.category.reload,
    err: state.category.err,
    noti: state.category.noti,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleCreate: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_CATE_VISIBLE_STATE, payload }),
  onChangeVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE, payload }),
  onGetCategory: (payload) =>
    dispath({ type: ACT_GET_CATEGORY_REQUEST, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(Category);
