import { Col, Row, Typography, DatePicker, Table, Button, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE,
  ACT_GET_PAYMENT_REQUEST,
  ACT_GET_PAYMENT_WITHOUT_PAGING_REQUEST,
} from "../../redux/action/payment";
import {
  dateFormat,
  dateFormatSearch,
  getToken,
} from "../../services/utils/const";
import { formatDate, formatNumber } from "../../services/utils/number";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const TablePayment = (props) => {
  const {
    id,
    onFetchDataPayment,
    loading,
    histories,
    onChangePaymentVisibleUpdate,
    reloadUpdate,
  } = props;
  var today = new Date();
  const defaultFromDate = moment(today).subtract(3, "months");
  const defaultToDate = moment(today);
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const [dataSourcePayment, setDataSourcePayment] = useState([]);

  const [paginationPayment, setPaginationPayment] = useState({
    current: 1,
    pageSize: 10,
  });

  const [totalWeight, setTotalWeight] = useState(null);
  const [money, setMoney] = useState(null);

  const canculateData = () => {
    let totalMoney = 0;
    let totalWeight = 0;
    histories.forEach((e) => {
      totalMoney += e.total_money;
      totalWeight += e.amount;
    });

    setTotalWeight(totalWeight);
    setMoney(totalMoney);
  };

  const fetchData = () => {
    onFetchDataPayment({
      user_id: id,
      from_date: moment(fromDate).format(dateFormatSearch),
      to_date: moment(toDate).format(dateFormatSearch),
      token: getToken(),
    });
  };

  useEffect(() => {
    if (id != undefined) {
      fetchData();
    }
  }, [id, reloadUpdate]);

  useEffect(() => {
    setDataSourcePayment(histories);
    canculateData();
  }, [histories]);

  const onSearch = () => {
    fetchData();
  };

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
      title: "Danh s??ch id",
      dataIndex: "list_sale_id",
      key: "list_sale_id",
      render: (listId) => {
        return listId.map((e) => {
          return e + "-";
        });
      },
    },
    {
      title: "T???ng c??n (Kg)",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => {
        return formatNumber(amount);
      },
    },
    {
      title: "T???ng ti???n",
      dataIndex: "total_money",
      key: "total_price",
      render: (money) => {
        return formatNumber(money);
      },
    },
    {
      title: "Ng??y thanh to??n",
      dataIndex: "payment_date",
      key: "payment_date",
      render: (date) => {
        return formatDate(date);
      },
    },
    {
      title: "Ghi ch??",
      dataIndex: "note",
      key: "note",
      render: (data) => {
        return <Text mark>{data}</Text>;
      },
    },
    {
      title: "C???p nh???t",
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
              S???a
            </Button>
          </>
        );
      },
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
      <Spin spinning={loading}>
        <Row>
          <Col offset={10}>
            <Title>???? thanh to??n</Title>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "8px" }}>
            <Title level={5}> Ng??y thanh to??n</Title>
          </Col>
          <Col span={4} offset={1}>
            <RangePicker
              // locale={locale}
              defaultValue={[
                moment(defaultFromDate, dateFormat),
                moment(defaultToDate, dateFormat),
              ]}
              size="large"
              format={dateFormat}
              onChange={(e) => {
                setFromDate(e[0]._d);
                setToDate(e[1]._d);
              }}
            />
          </Col>
          <Col offset={1}>
            {" "}
            <Button size="large" onClick={onSearch}>
              T??m ki???m
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              rowKey="id"
              columns={columnsPaymented}
              dataSource={dataSourcePayment}
              pagination={paginationPayment}
              bordered={true}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>T???ng k???t</Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6}>
                      <Text mark>{formatNumber(totalWeight ?? 0)} Kg</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={7}>
                      <Text mark>T???ng ti???n {formatNumber(money ?? 0)} VND</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    loading: state.payment.loading,
    histories: state.payment.histories,
    reloadUpdate: state.payment.reloadUpdate,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangePaymentVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE, payload }),
  onFetchDataPayment: (payload) => {
    dispath({ type: ACT_GET_PAYMENT_WITHOUT_PAGING_REQUEST, payload });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(TablePayment);
