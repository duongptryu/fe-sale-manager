import {
  Button,
  Col,
  DatePicker,
  Input,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { connect } from "react-redux";
import LayoutC from "../../components/layout/layout";
import { useEffect, useState } from "react";
import { formatNumber } from "../../services/utils/number";
import PopupUpdateOrder from "../../components/order/popupOrderUpdate";
import {
  ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE,
  ACT_CHANGE_ORDER_NOTI,
  ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE,
  ACT_GET_ORDER_REQUEST,
} from "../../redux/action/order";
import PopupOrderCreate from "../../components/order/popupOrderCreate";
import { ACT_GET_SELLER_WITHOUT_PAGING_REQUEST } from "../../redux/action/seller";
import { getToken } from "../../services/utils/const";
import { ACT_GET_CATEGORY_REQUEST } from "../../redux/action/category";

const { Title } = Typography;
const { Option } = Select;

const dateFormat = "DD/MM/YYYY";
const dateFormatSearch = "YYYY-MM-DD";

const Order = (props) => {
  var today = new Date();
  const {
    onChangeOrderVisibleCreate,
    onChangeOrderVisibleUpdate,
    onGetAllSeller,
    onGetAllCategory,
    onGetOrder,
    loading,
    orders,
    err,
    noti,
    sellers,
    categories,
    onChangeOrderNoti,
  } = props;
  const [date, setDate] = useState(today);
  const [name, setName] = useState("");
  const [cateId, setCateId] = useState(null);
  const [dataSource, setDataSource] = useState([]);

  //Get seller
  useEffect(() => {
    onGetOrder({
      token: getToken(),
    });
    onGetAllSeller({
      token: getToken(),
    });
    onGetAllCategory({
      token: getToken(),
    });
  }, []);

  useEffect(() => {
    setDataSource(orders);
  }, [orders]);

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

  const onSearch = () => {
    onGetOrder({
      name: name,
      cate_id: cateId,
      date: moment(new Date(date)).format(dateFormat),
      token: getToken(),
    });
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (value, item, index) => {
        return index + 1;
      },
    },
    {
      title: "Tên người bán",
      key: "name",
      render: (data) => {
        return data.user.name;
      },
    },
    {
      title: "Số điện thoại",
      key: "phone_number",
      render: (data) => {
        return data.user.phone_number;
      },
    },
    {
      title: "Thể loại",
      key: "category_name",
      render: (data) => {
        return data.category.name;
      },
    },
    {
      title: "Giá / Kg",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return formatNumber(price);
      },
    },
    {
      title: "Tổng túi",
      dataIndex: "bag_number",
      key: "bag_number",
      render: (bag_number) => {
        return formatNumber(bag_number);
      },
    },
    {
      title: "Tổng cân (Kg)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tổng tiền",
      key: "total_price",
      render: (data) => {
        return formatNumber(data.price * data.amount);
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "is_payment",
      key: "is_payment",
      render: (data) => {
        if (data) {
          return <Tag color="#2db7f5">Đã thanh toán</Tag>;
        } else {
          return <Tag color="#cd201f">Chua thanh toán</Tag>;
        }
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
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
              style={{ marginRight: "3px" }}
              onClick={() => handleUpdateBtn(data)}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Chắc chắn xóa"
              // onConfirm={confirm}
              onVisibleChange={() => console.log("visible change")}
            >
              <Button type="primary" size="small" danger>
                Xóa
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const handleCreateBtn = () => {
    onChangeOrderVisibleCreate({
      status: true,
    });
  };

  const handleUpdateBtn = (data) => {
    onChangeOrderVisibleUpdate({
      status: true,
      order: data,
    });
  };

  const onReset = () => {
    setName("");
    setCateId(null);
    setDate(today);
  };

  return (
    <LayoutC one={"/ Nhập hàng"} two="Thông tin nhập hàng theo ngày">
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
            <Col span={6}>
              <Input
                placeholder="Nhập tên"
                size="large"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col span={6} offset={1}>
              <Select
                style={{ width: 200 }}
                size="large"
                showSearch
                placeholder="Chọn thể loại"
                optionFilterProp="children"
                onChange={(v) => setCateId(v)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option value="0">Tất cả</Option>;
                {categories &&
                  categories.map((e) => {
                    return <Option value={e.id}>{e.name}</Option>;
                  })}
              </Select>
            </Col>
            <Col span={4} offset={1}>
              <DatePicker
                defaultValue={moment(today, dateFormat)}
                format={dateFormat}
                size="large"
                onChange={(e) => {
                  setDate(e);
                }}
              />
            </Col>
            <Col span={4} offset={1} style={{ float: "right" }}>
              <Space>
                <Button size="large" type="primary" onClick={onSearch}>
                  Tìm kiếm
                </Button>
                <Button size="large" type="primary" onClick={onReset}>
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
            <Col span={10}>
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
        <PopupUpdateOrder />
        <PopupOrderCreate />
      </Spin>
    </LayoutC>
  );
};

const mapStateToProp = (state) => {
  return {
    loading: state.order.loading,
    orders: state.order.orders,
    noti: state.order.noti,
    err: state.order.err,
    sellers: state.order.sellers,
    categories: state.category.categories,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeOrderVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE, payload }),
  onChangeOrderVisibleCreate: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE, payload }),
  onGetAllSeller: (payload) =>
    dispath({ type: ACT_GET_SELLER_WITHOUT_PAGING_REQUEST, payload }),
  onGetAllCategory: (payload) =>
    dispath({ type: ACT_GET_CATEGORY_REQUEST, payload }),
  onGetOrder: (payload) => {
    dispath({ type: ACT_GET_ORDER_REQUEST, payload });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(Order);
