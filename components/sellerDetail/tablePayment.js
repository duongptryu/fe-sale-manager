import { Col, Row, Typography, DatePicker, Table, Button } from "antd";
import moment from "moment";
import { useState } from "react";
import { connect } from "react-redux";
import { ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE } from "../../redux/action/payment";
import { dateFormat } from "../../services/utils/const";
import { formatNumber } from "../../services/utils/number";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const TablePayment = (props) => {
  const { onChangePaymentVisibleUpdate } = props;
  var today = new Date();
  const [fromDatePayment, setFromDatePayment] = useState(
    moment(today).subtract(3, "months").format(dateFormat)
  );
  const [toDatePayment, setToDatePayment] = useState(
    moment(today).format(dateFormat)
  );

  

  const [paginationPayment, setPaginationPayment] = useState({
    current: 1,
    pageSize: 10,
    total: 10,
  });

  const columnsPaymented = [
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
      title: "Danh sách id",
      dataIndex: "list_sale_id",
      key: "list_sale_id",
      render: (listId) => {
        return listId.map((e) => {
          return e + "-";
        });
      },
    },
    {
      title: "Tổng cân (Kg)",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => {
        return formatNumber(amount);
      },
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
      title: "Ngày thanh toán",
      dataIndex: "payment_date",
      key: "payment_date",
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
          </>
        );
      },
    },
  ];

  const dataSourcePayment = [
    {
      id: 1,
      amount: 300,
      list_sale_id: [1, 2, 3],
      total_money: 200000,
      payment_date: "123123",
      note: "abcxyz",
    },
    {
      id: 2,
      amount: 3003,
      list_sale_id: [1, 2, 3],
      total_money: 200100,
      payment_date: "123123",
      note: "abcxyz",
    },
    {
      id: 3,
      amount: 30033,
      list_sale_id: [1, 2, 3],
      total_money: 200100,
      payment_date: "123123",
      note: "abcxyz",
    },
  ];

  const handleUpdateBtn = (data) => {
    onChangePaymentVisibleUpdate({
      status: true,
      payment: data,
    });
  };

  return (
    <>
      <Row>
        <Col offset={10}>
          <Title>Đã thanh toán</Title>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "8px" }}>
          <Title level={5}> Ngày thanh toán</Title>
        </Col>
        <Col span={4} offset={1}>
          <RangePicker
            defaultValue={[
              moment(fromDatePayment, dateFormat),
              moment(toDatePayment, dateFormat),
            ]}
            size="large"
            format={dateFormat}
            onChange={(e) => {
              setFromDatePayment(e[0]._i);
              setToDatePayment(e[1]._i);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columnsPaymented}
            dataSource={dataSourcePayment}
            pagination={paginationPayment}
            bordered={true}
          />
        </Col>
      </Row>
    </>
  );
};

const mapDispatchToProp = (dispath) => ({
  onChangePaymentVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE, payload }),
});

export default connect(null, mapDispatchToProp)(TablePayment);
