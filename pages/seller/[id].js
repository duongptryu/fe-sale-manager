import { Col, Divider, PageHeader, Row } from "antd";
import PopupUpdateOrder from "../../components/order/popupOrderUpdate";
import PopupUpdatePayment from "../../components/sellerDetail/popupUpdatePayment";
import LayoutC from "../../components/layout/layout";
import { connect } from "react-redux";
import { ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE } from "../../redux/action/order";
import PersionSeller from "../../components/sellerDetail/persional";
import TotalStatistic from "../../components/sellerDetail/statistic";
import TableSell from "../../components/sellerDetail/tableSell";
import TablePayment from "../../components/sellerDetail/tablePayment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailSeller = (props) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <LayoutC one={"/ Người bán"} two="Chi tiết">
      <PageHeader
        className="site-page-header"
        onBack={() => Router.push("/seller")}
        title="Quay lại"
      />
      <Divider plain orientation="left">
        Thông tin cá nhân
      </Divider>
      <Row>
        <Col span={8}>
          <PersionSeller id={id} />
        </Col>
        <Col span={14}>
          <TotalStatistic id={id} />
        </Col>
      </Row>

      <Divider plain orientation="left">
        Thống kê
      </Divider>

      <TableSell />
      <Divider plain orientation="left">
        Đã thanh toán
      </Divider>
      <TablePayment id={id} />
      <PopupUpdateOrder />
      <PopupUpdatePayment />
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
});

export default connect(mapStateToProp, mapDispatchToProp)(DetailSeller);
