import {
  Button,
  Col,
  Input,
  notification,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import LayoutC from "../../components/layout/layout";
import PopupCreateSeller from "../../components/seller/popupCreateSeller";
import PopupUpdateSeller from "../../components/seller/popupUpdateSeller";
import {
  ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE,
  ACT_GET_SELLER_REQUEST,
} from "../../redux/action/seller";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "../../services/utils/const";
import { formatDate, formatNumber } from "../../services/utils/number";

const { Title, Text } = Typography;

const Seller = (props) => {
  const {
    reload,
    users,
    err,
    noti,
    loading,
    onChangeSellerVisibleCreate,
    onChangeSellerVisibleUpdate,
    onGetSeller,
    total,
  } = props;
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [nameSearch, setNameSearch] = useState("");
  const [phoneNumberSearch, setPhoneNumberSearch] = useState("");

  const Router = useRouter();

  const fetchData = () => {
    onGetSeller({
      page: pagination.current,
      limit: pagination.pageSize,
      name: nameSearch,
      phone_number: phoneNumberSearch,
      token: getToken(),
    });
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  useEffect(() => {
    setDataSource(users);
  }, [users]);

  useEffect(() => {
    fetchData();
  }, [pagination]);

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

  const onTableChange = (e) => {
    setPagination({
      ...pagination,
      current: e.current,
      pageSize: e.pageSize,
    });
  };

  const onSearch = () => {
    fetchData();
  };

  const onReset = () => {
    setNameSearch("");
    setPhoneNumberSearch("");
    onGetSeller({
      page: pagination.current,
      limit: pagination.pageSize,
      token: getToken(),
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "T??n",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "???? thanh to??n (VND)",
      key: "paid",
      width: "200px",
      render: (data) => {
        return (
          <Text mark>
            {formatNumber(data.user_paid_and_un_paid?.money_paid ?? 0)}
          </Text>
        );
      },
    },
    {
      title: "Ch??a thanh to??n (VND)",
      key: "unpaid",
      width: "200px",
      render: (data) => {
        return (
          <Text mark>
            {formatNumber(data.user_paid_and_un_paid?.money_unpaid ?? 0)}
          </Text>
        );
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
      title: "Ng??y t???o",
      dataIndex: "created_at",
      key: "created_at",
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
              onClick={() => handleUpdateBtn(data)}
              style={{
                marginRight: "10px",
              }}
            >
              S???a
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
    <LayoutC one={"/ Nh???p h??ng"} two="Ng?????i b??n">
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
            <Col span={8}>
              <Input
                placeholder="Nh???p t??n"
                size="large"
                value={nameSearch}
                onChange={(e) => {
                  setNameSearch(e.target.value);
                }}
              />
            </Col>
            <Col span={8} offset={1}>
              <Input
                placeholder="Nh???p s??? ??i???n tho???i"
                size="large"
                value={phoneNumberSearch}
                onChange={(e) => {
                  setPhoneNumberSearch(e.target.value);
                }}
              />
            </Col>
            <Col span={6} offset={1} style={{ float: "right" }}>
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
            <Col span={12}>
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
                pagination={{ ...pagination, total: total }}
                onChange={(e) => {
                  onTableChange(e);
                }}
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

const mapStateToProp = (state) => {
  return {
    loading: state.seller.loading,
    users: state.seller.users,
    reload: state.seller.reload,
    err: state.seller.err,
    noti: state.seller.noti,
    total: state.seller.total,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeSellerVisibleCreate: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE, payload }),
  onChangeSellerVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE, payload }),
  onGetSeller: (payload) => dispath({ type: ACT_GET_SELLER_REQUEST, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(Seller);
