import { Col, Typography } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ACT_GET_A_SELLER_REQUEST } from "../../redux/action/seller";
import { getToken } from "../../services/utils/const";

const { Title } = Typography;

const PersionSeller = (props) => {
  const [seller, setSeller] = useState(null);
  const { id, onGetSeller, aUser } = props;
  useEffect(() => {
    if (id == undefined) {
      return;
    }
    onGetSeller({
      id: id,
      token: getToken(),
    });
  }, [id]);

  useEffect(() => {
    setSeller(aUser);
  }, [aUser]);
  return (
    <Col span={10}>
      <Typography>
        <Title level={3}>Thông tin cá nhân</Title>
        <Title level={5}>Tên:</Title>
        <p>{seller?.name ?? "Không xác định"}</p>
        <Title level={5}>Số điện thoại:</Title>
        <p>{seller?.phone_number ?? "Không xác định"}</p>
        <Title level={5}>Ghi chú:</Title>
        <p>{seller?.note ?? "Không xác định"}</p>
      </Typography>
    </Col>
  );
};

const mapStateToProp = (state) => {
  return {
    loading: state.order.loading,
    aUser: state.seller.aUser,
  };
};

const mapDispatchToProp = (dispath) => ({
  onGetSeller: (payload) => {
    dispath({ type: ACT_GET_A_SELLER_REQUEST, payload });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(PersionSeller);
