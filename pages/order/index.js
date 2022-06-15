import {
  Button,
  Col,
  DatePicker,
  Input,
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
import { useState } from "react";
import formatNumber from "../../services/utils/number";
import PopupUpdateOrder from "../../components/order/popupOrderUpdate";
import {
  ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE,
} from "../../redux/action/order";
import PopupOrderCreate from "../../components/order/popupOrderCreate";

const { Title } = Typography;
const { Option } = Select;

const dateFormat = "DD/MM/YYYY";

const Order = (props) => {
  var today = new Date();
  const { onChangeOrderVisibleCreate, onChangeOrderVisibleUpdate, loading } =
    props;
  const [date, setDate] = useState(moment(today).format(dateFormat));
  const [name, setName] = useState("");
  const [cateId, setCateId] = useState(null);

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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Thể loại",
      dataIndex: "category_name",
      key: "category_name",
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

  const dataSource = [
    {
      id: "1",
      name: "Duong",
      phone_number: "0969360916",
      category_name: "susu an",
      price: 2400,
      amount: 300,
      bag_number: 200,
      is_payment: false,
      note: "abcxyz",
    },
    {
      id: "2",
      name: "Duong123",
      phone_number: "0969360916",
      category_name: "susu giong",
      price: 5000,
      amount: 300,
      bag_number: 300,
      is_payment: false,
      note: "abcxyz",
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

  const onSearch = () => {};

  const onReset = () => {
    setName("");
    setCateId(null);
    setDate(moment(today).format(dateFormat));
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
                size="large"
                showSearch
                placeholder="Chọn thể loại"
                optionFilterProp="children"
                onChange={(v) => setCateId(v)}
                defaultValue={cateId}
                value={cateId}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Col>
            <Col span={4} offset={1}>
              <DatePicker
                defaultValue={moment(date, dateFormat)}
                // locale={locale}
                format={dateFormat}
                size="large"
                value={moment(date, dateFormat)}
                onChange={(e) => {
                  console.log(e);
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
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeOrderVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE, payload }),
  onChangeOrderVisibleCreate: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(Order);
