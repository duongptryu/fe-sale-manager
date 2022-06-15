import {
  Row,
  Select,
  Table,
  Typography,
  DatePicker,
  Space,
  Button,
  Col,
  Tag,
  Popconfirm,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { connect } from "react-redux";
import { ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE } from "../../redux/action/order";
import { dateFormat } from "../../services/utils/const";
import formatNumber from "../../services/utils/number";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const TableSell = (props) => {
  const { onChangeOrderVisibleUpdate } = props;
  var today = new Date();
  const [fromDate, setFromDate] = useState(
    moment(today).subtract(3, "months").format(dateFormat)
  );
  const [toDate, setToDate] = useState(moment(today).format(dateFormat));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
  });
  const [totalMoney, setTotalMoney] = useState(0);

  const hasSelected = selectedRowKeys.length > 0;

  const onSelectChange = (newSelectedRowKeys, record) => {
    setSelectedRowKeys(newSelectedRowKeys);
    var totalMoney = 0;
    record.forEach((e) => {
      totalMoney += e.total_money;
    });
    setTotalMoney(totalMoney);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.is_payment === true,
      // Column configuration not to be checked
      name: record.name,
    }),
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
      title: "id",
      dataIndex: "id",
      key: "id",
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
      dataIndex: "total_money",
      key: "total_price",
      render: (money) => {
        return formatNumber(money);
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
      title: "Ngày mua",
      dataIndex: "buy_date",
      key: "buy_date",
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
      key: "1",
      id: 1,
      name: "Duong",
      phone_number: "0969360916",
      category_name: "susu an",
      price: 2400,
      amount: 300,
      total_money: 200000,
      bag_number: 200,
      is_payment: false,
      buy_date: "123123",
      note: "abcxyz",
    },
    {
      key: "2",
      id: 2,
      name: "Duong123",
      phone_number: "0969360916",
      category_name: "susu giong",
      price: 5000,
      amount: 300,
      total_money: 200000,
      bag_number: 300,
      is_payment: true,
      buy_date: "123123",
      note: "abcxyz",
    },
    {
      key: "3",
      id: 3,
      name: "Duong123",
      phone_number: "0969360916",
      category_name: "susu giong",
      price: 5000,
      amount: 300,
      total_money: 200000,
      bag_number: 300,
      is_payment: false,
      buy_date: "123123",
      note: "abcxyz",
    },
  ];

  const handleUpdateBtn = (data) => {
    onChangeOrderVisibleUpdate({
      status: true,
      order: data,
    });
  };

  return (
    <>
      <Row>
        <Col offset={10}>
          <Title>Tìm kiếm</Title>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Select
            size="large"
            showSearch
            placeholder="Chọn trạng thái"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {/* <Option value="0">Tất cả</Option>
            <Option value={true}>Đã thanh toán</Option>
            <Option value={false}>Chưa thanh toán</Option> */}
          </Select>
        </Col>
        <Col span={6} offset={1}>
          <Select
            size="large"
            showSearch
            placeholder="Chọn thể loại"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option> */}
          </Select>
        </Col>
        <Col span={4} offset={1}>
          <RangePicker
            defaultValue={[
              moment(fromDate, dateFormat),
              moment(toDate, dateFormat),
            ]}
            size="large"
            format={dateFormat}
            onChange={(e) => {
              setFromDate(e[0]._i);
              setToDate(e[1]._i);
            }}
          />
        </Col>
        <Col span={4} offset={1} style={{ float: "right" }}>
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
      <Row>
        <Col span={24}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            bordered={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            style={{
              marginBottom: 16,
            }}
          >
            <Button type="primary" size="large">
              Thanh toán
            </Button>
            <span
              style={{
                marginLeft: 8,
              }}
            >
              {hasSelected ? `Đã chọn  ${selectedRowKeys.length} dòng` : ""}
            </span>
            <span
              style={{
                marginLeft: 30,
              }}
            >
              <Text mark>
                {" "}
                {totalMoney ? `Tổng tiền  ${formatNumber(totalMoney)} VND` : ""}
              </Text>
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};

const mapDispatchToProp = (dispath) => ({
  onChangeOrderVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE, payload }),
});

export default connect(null, mapDispatchToProp)(TableSell);
