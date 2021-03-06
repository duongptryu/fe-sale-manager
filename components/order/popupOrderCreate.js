import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE,
  ACT_CREATE_ORDER_REQUEST,
} from "../../redux/action/order";
import { formatNumber } from "../../services/utils/number";
import { getToken } from "../../services/utils/const";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const dateFormat = "DD/MM/YYYY";

const PopupCreateOrder = (props) => {
  var today = new Date();
  const [date, setDate] = useState(today);
  const {
    createVisible,
    onChangeVisibleCreate,
    onCreateOrder,
    sellers,
    categories,
    reload,
  } = props;
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [cateId, setCateId] = useState(0);
  const [bagNumber, setBagNumber] = useState(0);
  const [isPayment, setIsPayment] = useState(false);
  const [note, setNote] = useState("");
  const [userId, setUserId] = useState(0);

  const [isInputKg, setIsInputKg] = useState(false);

  const [form] = Form.useForm();

  const onClose = () => {
    onChangeVisibleCreate({
      status: false,
    });
  };

  useEffect(() => {
    if (reload) {
      form.resetFields();
    }
  }, [reload]);

  useEffect(() => {
    setAmount(bagNumber * 10);
    form.setFieldsValue({
      amount: bagNumber * 10,
    });
  }, [bagNumber]);

  useEffect(() => {
    setAmount(0);
    setBagNumber(0);
    form.setFieldsValue({
      amount: 0,
      bag_number: 0,
    });
  }, [isInputKg]);

  const onCreate = () => {
    onCreateOrder({
      user_id: userId,
      cate_id: cateId,
      is_payment: isPayment,
      amount: amount,
      bag_number: bagNumber,
      note: note,
      price: price,
      date: moment(new Date(date)).format(),
      token: getToken(),
    });
  };

  return (
    <>
      <Drawer
        title="T???o ????n h??ng"
        height={600}
        onClose={onClose}
        visible={createVisible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        placement="bottom"
        extra={
          <Space>
            <Button onClick={onClose}>H???y</Button>
            <Button onClick={onCreate} type="primary">
              T???o
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item name="name" label="T??n ng?????i b??n">
                <Select
                  size="large"
                  showSearch
                  placeholder="T??n ng?????i b??n"
                  optionFilterProp="children"
                  onChange={(v) => setUserId(v)}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {sellers &&
                    sellers.map((e, index) => {
                      return (
                        <Option value={e.id} key={index}>
                          {e.name + " [" + e.phone_number + "]"}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="cate_id" label="Th??? lo???i">
                <Select
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
                  {categories &&
                    categories.map((e, index) => {
                      return (
                        <Option value={e.id} key={index}>
                          {e.name} [{e.kg_for_bag} Kg]
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="price" label="Gi?? / Kg">
                <InputNumber
                  value={price}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(e) => setPrice(e)}
                  prefix="VND"
                  size="large"
                  min={0}
                  style={{ width: 200 }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <Form.Item name="bag_number" label="Nh???p s??? c??n n???ng">
                <Checkbox
                  onChange={(e) => {
                    setIsInputKg(e.target.checked);
                    setBagNumber(0);
                    setAmount(0);
                  }}
                >
                  T??? nh???p s??? l?????ng c??n n???ng
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="bag_number" label="T???ng s??? t??i">
                <InputNumber
                  value={bagNumber}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(e) => setBagNumber(e)}
                  prefix="T??i"
                  size="large"
                  min={0}
                  style={{ width: 200 }}
                  disabled={isInputKg}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item name="amount" label="T???ng c??n">
                <InputNumber
                  value={amount}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(e) => setAmount(e)}
                  prefix="Kg"
                  size="large"
                  min={0}
                  style={{ width: 200 }}
                  disabled={!isInputKg}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item name="note" label="T???ng ti???n">
                <Text level={4}>{formatNumber(amount * price)} VND</Text>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={7}>
              <Form.Item name="is_payment" label="Tr???ng th??i">
                <Select
                  size="large"
                  showSearch
                  placeholder="Ch???n tr???ng th??i"
                  optionFilterProp="children"
                  onChange={(v) => setIsPayment(v)}
                  value={isPayment}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value={false}>
                    <Tag color="#cd201f">Ch??a thanh to??n</Tag>
                  </Option>
                  <Option value={true}>
                    <Tag color="#87d068">???? thanh to??n </Tag>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10} offset={1}>
              <Form.Item name="date" label="Ng??y mua">
                <DatePicker
                  defaultValue={moment(today, dateFormat)}
                  format={dateFormat}
                  size="large"
                  value={moment(date, dateFormat)}
                  onChange={(e) => {
                    setDate(e);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Item name="note" label="Ghi ch??">
              <TextArea
                rows={4}
                value={note}
                placeholder="Ghi ch??"
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Form>
      </Drawer>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    createVisible: state.order.createVisible,
    sellers: state.order.sellers,
    categories: state.category.categories,
    reload: state.order.reload,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleCreate: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE, payload }),
  onCreateOrder: (payload) => {
    dispath({ type: ACT_CREATE_ORDER_REQUEST, payload });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupCreateOrder);
