import { Card, Col, Row, Statistic, Typography } from "antd";

const { Title } = Typography;

const TotalStatistic = () => {
  return (
    <>
      <Title level={3}>Thống kê</Title>
      <Row>
        <Col span={12}>
          <Card>
            <Statistic title="Tổng tiền" value={1128} suffix="VND" />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Tổng kg" value={1128} suffix="KG" />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card>
            <Statistic
              title="Đã thanh toán"
              value={1128}
              valueStyle={{ color: "#4287f5" }}
              suffix="VND"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Còn lại"
              value={1128}
              valueStyle={{ color: "#cf1322" }}
              suffix="VND"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TotalStatistic;
