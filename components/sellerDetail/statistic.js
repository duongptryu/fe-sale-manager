import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Spin,
  Statistic,
  Typography,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ACT_GET_STATISTIC_A_USER_SALE_REQUEST } from "../../redux/action/statistic";
import { getToken } from "../../services/utils/const";

const { Title } = Typography;

const TotalStatistic = (props) => {
  const { id, onGetStatisticUserSeller, loading, data } = props;
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (id != undefined) {
      onGetStatisticUserSeller({
        id: id,
        year: date ? moment(date).year() : null,
        token: getToken(),
      });
    }
  }, [date, id]);

  const onYearChange = (date) => {
    setDate(date);
  };

  const handleAllYear = () => {
    setDate(null);
  };

  return (
    <>
      <Spin spinning={loading}>
        <Row>
          <Col span={12}>
            <Title level={3}>Thống kê</Title>
          </Col>

          <Col>
            <DatePicker
              onChange={onYearChange}
              picker="year"
              size="large"
              value={date}
            />
            <Button
              size="large"
              type="primary"
              style={{
                marginLeft: "10px",
              }}
              onClick={handleAllYear}
            >
              Tất cả các năm
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card>
              <Statistic
                title="Tổng tiền"
                value={data?.total_money ?? 0}
                suffix="VND"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Tổng kg"
                value={data?.total_kg ?? 0}
                suffix="KG"
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card>
              <Statistic
                title="Đã thanh toán"
                value={data?.money_payment ?? 0}
                valueStyle={{ color: "#4287f5" }}
                suffix="VND"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Còn lại"
                value={data?.money_not_payment_yet ?? 0}
                valueStyle={{ color: "#cf1322" }}
                suffix="VND"
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    loading: state.statistic.loading_user_sale,
    data: state.statistic.a_user_sale,
  };
};

const mapDispatchToProp = (dispath) => ({
  onGetStatisticUserSeller: (payload) => {
    dispath({
      type: ACT_GET_STATISTIC_A_USER_SALE_REQUEST,
      payload,
    });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(TotalStatistic);
