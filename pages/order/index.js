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
import { formatDate, formatNumber } from "../../services/utils/number";
import PopupUpdateOrder from "../../components/order/popupOrderUpdate";
import {
  ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE,
  ACT_CHANGE_ORDER_NOTI,
  ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE,
  ACT_DELETE_ORDER_REQUEST,
  ACT_GET_ORDER_REQUEST,
  ACT_GET_ORDER_WITHOUT_PAGING_REQUEST,
} from "../../redux/action/order";
import PopupOrderCreate from "../../components/order/popupOrderCreate";
import { ACT_GET_SELLER_WITHOUT_PAGING_REQUEST } from "../../redux/action/seller";
import { getToken } from "../../services/utils/const";
import { ACT_GET_CATEGORY_REQUEST } from "../../redux/action/category";
import { render } from "react-dom";
import { ACT_CREATE_PAYMENT_REQUEST } from "../../redux/action/payment";

const { Title, Text } = Typography;
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
    categories,
    reload,
    onPaymentOrder,
    errPayment,
    notiPayment,
    reloadPayment,
    onDeleteOrder,
  } = props;
  const [date, setDate] = useState(today);
  const [name, setName] = useState("");
  const [cateId, setCateId] = useState(null);
  const [dataSource, setDataSource] = useState([]);

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
    if (reload) {
      onGetOrder({
        name: name,
        cate_id: cateId,
        date: moment(new Date(date)).format(dateFormatSearch),
        token: getToken(),
      });
    }
  }, [reload]);

  useEffect(() => {
    setDataSource(orders);
    canculateData();
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

  useEffect(() => {
    if (errPayment != "") {
      return notification.error({
        message: errPayment,
      });
    }
  }, [errPayment]);

  useEffect(() => {
    if (notiPayment != "") {
      return notification.success({
        message: notiPayment,
      });
    }
  }, [notiPayment]);

  useEffect(() => {
    onGetOrder({
      name: name,
      cate_id: cateId,
      date: moment(new Date(date)).format(dateFormatSearch),
      token: getToken(),
    });
  }, [reload, reloadPayment]);

  const onSearch = () => {
    onGetOrder({
      name: name,
      cate_id: cateId,
      date: moment(new Date(date)).format(dateFormatSearch),
      token: getToken(),
    });
  };

  const onPayment = (data) => {
    onPaymentOrder({
      user_id: data.user_id,
      list_sale_id: [data.id],
      payment_date: new Date(),
      note: "",
      token: getToken(),
    });
  };

  const onDelete = (data) => {
    onDeleteOrder({
      id: data.id,
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
      title: "T??n ng?????i b??n",
      key: "name",
      render: (data) => {
        return data.user.name;
      },
    },
    {
      title: "S??? ??i???n tho???i",
      key: "phone_number",
      render: (data) => {
        return data.user.phone_number;
      },
    },
    {
      title: "Th??? lo???i",
      key: "category_name",
      render: (data) => {
        return data.category.name;
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
      key: "total_price",
      width: "15%",
      render: (data) => {
        return formatNumber(data.price * data.amount);
      },
    },
    {
      title: "Tr???ng th??i",
      width: "15%",
      key: "is_payment",
      render: (data) => {
        if (data.is_payment) {
          return <Tag color="#2db7f5">???? thanh to??n</Tag>;
        } else {
          return (
            <Popconfirm
              title="Ch???c ch???n thanh to??n"
              onConfirm={() => {
                onPayment(data);
              }}
            >
              <Button type="primary" size="small" danger>
                Ch??a thanh to??n
              </Button>
            </Popconfirm>
          );
        }
      },
    },
    {
      title: "Ghi ch??",
      dataIndex: "note",
      key: "note",
      width: "200px",
      render: (note) => {
        return <Text mark>{note}</Text>;
      },
    },
    {
      title: "Ng??y mua",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        return moment(date).format(dateFormat);
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
            <Popconfirm title="Ch???c ch???n x??a" onConfirm={() => onDelete(data)}>
              <Button type="primary" size="small" danger>
                X??a
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
    onGetOrder({
      name: "",
      cate_id: 0,
      date: moment(new Date(today)).format(dateFormatSearch),
      token: getToken(),
    });
  };

  return (
    <LayoutC one={"/ Nh???p h??ng"} two="Th??ng tin nh???p h??ng theo ng??y">
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
              <Title>T??m ki???m</Title>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Input
                placeholder="Nh???p t??n"
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
                placeholder="Ch???n th??? lo???i"
                optionFilterProp="children"
                onChange={(v) => setCateId(v)}
                value={cateId}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                <Option value="0">T???t c???</Option>;
                {categories &&
                  categories.map((e, index) => {
                    return (
                      <Option value={e.id} key={index}>
                        {e.name} [{e.kg_for_bag} Kg]
                      </Option>
                    );
                  })}
              </Select>
            </Col>
            <Col span={4} offset={1}>
              <DatePicker
                defaultValue={moment(today, dateFormat)}
                format={dateFormat}
                size="large"
                value={moment(date, dateFormat)}
                onChange={(e) => {
                  setDate(e);
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
        </div>
        <div
          className="site-layout-background"
          style={{
            padding: 24,
          }}
        >
          <Row style={{ marginBottom: "10px" }}>
            <Col span={12}>
              <Title level={3}>B???ng hi???n th??? ng?????i b??n</Title>
            </Col>
            <Col span={10}>
              <Button
                type="primary"
                size="large"
                style={{ float: "right" }}
                icon={<PlusOutlined />}
                onClick={handleCreateBtn}
              >
                Th??m
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                scroll={{
                  y: 800,
                }}
                bordered
                summary={() => (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>
                        T???ng k???t
                      </Table.Summary.Cell>
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
                          {formatNumber(
                            money?.total_money_not_payment_yet ?? 0
                          )}
                          VND
                        </Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={8}>
                        <Text mark>
                          ???? thanh to??n {payment?.paymented ?? 0}
                        </Text>
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
    reload: state.order.reload,
    reloadPayment: state.payment.reload,
    errPayment: state.payment.err,
    notiPayment: state.payment.noti,
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
    dispath({ type: ACT_GET_ORDER_WITHOUT_PAGING_REQUEST, payload });
  },
  onPaymentOrder: (payload) => {
    dispath({ type: ACT_CREATE_PAYMENT_REQUEST, payload });
  },
  onDeleteOrder: (payload) => {
    dispath({ type: ACT_DELETE_ORDER_REQUEST, payload });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(Order);
