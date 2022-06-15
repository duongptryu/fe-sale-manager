import { Col, Typography } from "antd";

const { Title } = Typography;

const PersionSeller = () => {
  return (
    <Col span={10}>
      <Typography>
        <Title level={3}>Thông tin cá nhân</Title>
        <Title level={5}>Tên:</Title>
        <p>Duong</p>
        <Title level={5}>Số điện thoại:</Title>
        <p>0969360916</p>
        <Title level={5}>Ghi chú:</Title>
        <p>ABCXYZ</p>
      </Typography>
    </Col>
  );
};

export default PersionSeller;
