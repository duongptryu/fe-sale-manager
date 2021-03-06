import { ExclamationCircleOutlined } from "@ant-design/icons";
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
  Spin,
  Modal,
  Input,
} from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE,
  ACT_DELETE_ORDER_REQUEST,
  ACT_GET_ORDER_REQUEST,
  ACT_GET_ORDER_WITHOUT_PAGING_REQUEST,
} from "../../redux/action/order";
import { ACT_CREATE_PAYMENT_REQUEST } from "../../redux/action/payment";
import {
  dateFormat,
  dateFormatSearch,
  getToken,
} from "../../services/utils/const";
import { formatDate, formatNumber } from "../../services/utils/number";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;

const TableSell = (props) => {
  const {
    id,
    loading,
    paymentLoading,
    reload,
    categories,
    orders,
    onChangeOrderVisibleUpdate,
    onFetchDataOrder,
    onPaymentOrder,
    onDeleteOrder,
    reloadOrder,
  } = props;

  var today = new Date();
  const defaultFromDate = moment(today).subtract(3, "months");
  const defaultToDate = moment(today);
  const [fromDate, setFromDate] = useState(defaultFromDate);
  const [toDate, setToDate] = useState(defaultToDate);
  const [totalMoney, setTotalMoney] = useState(0);
  const [cateId, setCateId] = useState(null);
  const [isPayment, setIsPayment] = useState(null);

  const [dataSource, setDataSource] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [note, setNote] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [totalBag, setTotalBag] = useState(null);
  const [totalWeight, setTotalWeight] = useState(null);
  const [money, setMoney] = useState(null);
  const [payment, setPayment] = useState(null);

  const canculateData = () => {
    let totalMoney = 0;
    let totalMoneyPaymented = 0;
    let totalBag = 0;
    let totalWeight = 0;
    let paymented = 0;
    let notPaymentYet = 0;
    orders.forEach((e) => {
      totalMoney += e.total_money;
      totalBag += e.bag_number;
      totalWeight += e.amount;
      if (e.is_payment) {
        paymented += 1;
        totalMoneyPaymented += e.total_money;
      } else {
        notPaymentYet += 1;
      }
    });

    setTotalBag(totalBag);
    setTotalWeight(totalWeight);
    setMoney({
      total_money: totalMoney,
      total_money_paymented: totalMoneyPaymented,
      total_money_not_payment_yet: totalMoney - totalMoneyPaymented,
    });
    setPayment({
      paymented: paymented,
      notePaymentYet: notPaymentYet,
    });
  };

  const fetchData = () => {
    onFetchDataOrder({
      user_id: id,
      from_date: moment(fromDate).format(dateFormatSearch),
      to_date: moment(toDate).format(dateFormatSearch),
      cate_id: cateId,
      is_payment: isPayment,
      token: getToken(),
    });
  };

  useEffect(() => {
    if (reload) {
      setSelectedRowKeys([]);
      setTotalMoney(0);
      fetchData();
    }
  }, [reload]);

  useEffect(() => {
    if (reloadOrder) {
      setSelectedRowKeys([]);
      setTotalMoney(0);
      fetchData();
    }
  }, [reloadOrder]);

  useEffect(() => {
    if (id != undefined) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    setDataSource(orders);
    canculateData();
  }, [orders]);

  const onSearch = () => {
    fetchData();
  };

  const onReset = () => {
    setCateId(null);
    setIsPayment(null);
    setFromDate(defaultFromDate);
    setToDate(defaultToDate);

    onFetchDataOrder({
      user_id: id,
      from_date: moment(defaultFromDate).format(dateFormatSearch),
      to_date: moment(defaultToDate).format(dateFormatSearch),
      cate_id: 0,
      is_payment: null,
      token: getToken(),
    });
  };

  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          {`?????ng ?? thanh to??n ${
            selectedRowKeys.length
          } d??ng v???i s??? ti???n l?? ${formatNumber(totalMoney)} VND`}
          <br></br>
          {`Ghi ch??: ${note}`}
        </>
      ),

      onOk() {
        onPayment();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onPayment = () => {
    onPaymentOrder({
      user_id: parseInt(id),
      list_sale_id: selectedRowKeys,
      payment_date: new Date(),
      note: note,
      token: getToken(),
    });
  };

  const onDelete = (data) => {
    onDeleteOrder({
      id: data.id,
      token: getToken(),
    });
  };

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
      title: "Th??? lo???i",
      key: "category_name",
      render: (data) => {
        return data.category?.name ?? "Kh??ng x??c ?????nh";
      },
    },
    {
      title: "Gi?? / Kg",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return formatNumber(price);
      },
    },
    {
      title: "T???ng t??i",
      dataIndex: "bag_number",
      key: "bag_number",
      render: (bag_number) => {
        return formatNumber(bag_number);
      },
    },
    {
      title: "T???ng c??n (Kg)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "T???ng ti???n",
      dataIndex: "total_money",
      width: "15%",
      key: "total_price",
      render: (money) => {
        return formatNumber(money);
      },
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "is_payment",
      width: "15%",
      key: "is_payment",
      render: (data) => {
        if (data) {
          return <Tag color="#2db7f5">???? thanh to??n</Tag>;
        } else {
          return <Tag color="#cd201f">Chua thanh to??n</Tag>;
        }
      },
    },
    {
      title: "Ghi ch??",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Ng??y mua",
      dataIndex: "date",
      key: "buy_date",
      render: (date) => {
        return formatDate(date);
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
            <Popconfirm
              title="Ch???c ch???n x??a"
              onConfirm={() => {
                onDelete(data);
              }}
            >
              <Button type="primary" size="small" danger>
                X??a
              </Button>
            </Popconfirm>
          </>
        );
      },
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
      <Spin spinning={loading}>
        <Row>
          <Col offset={10}>
            <Title>T??m ki???m</Title>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Select
              size="large"
              showSearch
              placeholder="Ch???n tr???ng th??i"
              optionFilterProp="children"
              value={isPayment}
              onChange={(e) => {
                setIsPayment(e);
              }}
              style={{ width: 200 }}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="">T???t c???</Option>
              <Option value="true">???? thanh to??n</Option>
              <Option value="false">Ch??a thanh to??n</Option>
            </Select>
          </Col>
          <Col span={6} offset={1}>
            <Select
              size="large"
              showSearch
              placeholder="Ch???n th??? lo???i"
              optionFilterProp="children"
              value={cateId}
              onChange={(e) => {
                setCateId(e);
              }}
              style={{ width: 200 }}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="0">T???t c???</Option>;
              {categories &&
                categories.map((e, index) => {
                  return (
                    <Option value={e.id} key={index}>
                      {e.name}
                    </Option>
                  );
                })}
            </Select>
          </Col>
          <Col span={4} offset={1}>
            <RangePicker
              defaultValue={[
                moment(defaultFromDate, dateFormat),
                moment(defaultToDate, dateFormat),
              ]}
              size="large"
              format={dateFormat}
              onChange={(e) => {
                console.log(e);
                setFromDate(e[0]._d);
                setToDate(e[1]._d);
              }}
            />
          </Col>
          <Col span={4} offset={1} style={{ float: "right" }}>
            <Space>
              <Button size="large" type="primary" onClick={onSearch}>
                T??m ki???m
              </Button>
              <Button size="large" type="primary" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              rowKey="id"
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
              pagination={pagination}
              onChange={(e) => {
                setPagination({
                  ...pagination,
                  current: e.current,
                  pageSize: e.pageSize,
                });
              }}
              bordered={true}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>T???ng k???t</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                      <Text mark>{formatNumber(totalBag ?? 0)} T??i</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6}>
                      <Text mark>{formatNumber(totalWeight ?? 0)} Kg</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={7}>
                      <Text mark>
                        T???ng ti???n {formatNumber(money?.total_money ?? 0)} VND
                      </Text>
                      <br></br>
                      <Text mark>
                        ???? thanh to??n{" "}
                        {formatNumber(money?.total_money_paymented ?? 0)} VND
                      </Text>
                      <br></br>
                      <Text mark>
                        Ch??a thanh to??n{" "}
                        {formatNumber(money?.total_money_not_payment_yet ?? 0)}{" "}
                        VND
                      </Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={8}>
                      <Text mark>???? thanh to??n {payment?.paymented ?? 0}</Text>
                      <br></br>
                      <Text mark>
                        Ch??a thanh to??n {payment?.notePaymentYet ?? 0}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <Button
                type="primary"
                size="large"
                onClick={showConfirm}
                loading={paymentLoading}
              >
                Thanh to??n
              </Button>
              <span
                style={{
                  marginLeft: 8,
                }}
              >
                {hasSelected ? `???? ch???n  ${selectedRowKeys.length} d??ng` : ""}
              </span>
              <span
                style={{
                  marginLeft: 30,
                }}
              >
                <Text mark>
                  {" "}
                  {totalMoney
                    ? `T???ng ti???n  ${formatNumber(totalMoney)} VND`
                    : ""}
                </Text>
              </span>
            </div>
            <div>
              <TextArea
                rows={4}
                placeholder="Ghi ch??"
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              ></TextArea>
            </div>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    loading: state.order.loading,
    categories: state.category.categories,
    orders: state.order.orders,
    reload: state.payment.reload,
    reloadOrder: state.order.reload,
    paymentLoading: state.payment.loading,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeOrderVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE, payload }),
  onFetchDataOrder: (payload) => {
    dispath({ type: ACT_GET_ORDER_WITHOUT_PAGING_REQUEST, payload });
  },
  onPaymentOrder: (payload) => {
    dispath({ type: ACT_CREATE_PAYMENT_REQUEST, payload });
  },
  onDeleteOrder: (payload) => {
    dispath({ type: ACT_DELETE_ORDER_REQUEST, payload });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(TableSell);
