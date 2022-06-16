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
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE } from "../../redux/action/order";
import { formatNumber } from "../../services/utils/number";

const { TextArea } = Input;
const { Option } = Select;

const PopupUpdateOrder = (props) => {
  const { updateVisible, order, onChangeVisibleUpdate } = props;
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [cateId, setCateId] = useState(0);
  const [isPayment, setIsPayment] = useState(false);
  const [note, setNote] = useState("");
  const [bagNumber, setBagNumber] = useState(0);
  const [isInputKg, setIsInputKg] = useState(false);

  const [form] = Form.useForm();

  const onClose = () => {
    onChangeVisibleUpdate({
      status: false,
      order: null,
    });
  };

  useEffect(() => {
    setPrice(order?.price ?? 0);
    setAmount(order?.amount ?? 0);
    setCateId(order?.cate_id ?? "Không xác định");
    setIsPayment(order?.is_payment ?? false);
    setNote(order?.note ?? "");
    setBagNumber(order?.bag_number ?? "");
    form.setFieldsValue({
      id: order?.id ?? "Không xác định",
      name: order?.name ?? "Không xác định",
      phone_number: order?.phone_number ?? "Không xác định",
      cate_id: order?.cate_id ?? "Không xác định",
      price: order?.price ?? 0,
      amount: order?.amount ?? 0,
      bag_number: order?.bag_number ?? 0,
      is_payment: order?.is_payment ?? false,
      note: order?.note ?? "",
      created_at: order?.created_at ?? "Không xác định",
      updated_at: order?.updated_at ?? "Không xác định",
    });
  }, [order]);

  useEffect(() => {
    form.setFieldsValue({
      total_money: formatNumber(amount * price),
    });
  }, [price, amount]);

  useEffect(() => {
    setAmount(0);
    setBagNumber(0);
    form.setFieldsValue({
      amount: 0,
      bag_number: 0,
    });
  }, [isInputKg]);

  useEffect(() => {
    setAmount(bagNumber * 10);
    form.setFieldsValue({
      amount: bagNumber * 10,
    });
  }, [bagNumber]);

  return (
    <>
      <Drawer
        title="Cập nhật"
        width={600}
        onClose={onClose}
        visible={updateVisible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={onClose} type="primary">
              Cập nhật
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="id" label="Id">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="name" label="Tên người bán">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phone_number" label="Số điện thoại">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="cate_id" label="Thể loại">
                <Select
                  size="large"
                  showSearch
                  placeholder="Chọn thể loại"
                  optionFilterProp="children"
                  onChange={(v) => setCateId(v)}
                  value={cateId}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="1">Jack</Option>
                  <Option value="2">Lucy</Option>
                  <Option value="3">Tom</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="price" label="Giá / Kg">
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
            <Col span={24}>
              <Form.Item name="xxx" label="Nhập số cân nặng">
                <Checkbox
                  onChange={(e) => {
                    setIsInputKg(e.target.checked);
                  }}
                >
                  Tự nhập số lượng cân nặng
                </Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="bag_number" label="Tổng số túi">
                <InputNumber
                  value={bagNumber}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(e) => setBagNumber(e)}
                  prefix="Túi"
                  size="large"
                  min={0}
                  style={{ width: 200 }}
                  disabled={isInputKg}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="amount" label="Tổng cân">
                <Input
                  prefix="Kg"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  value={amount}
                  disabled={!isInputKg}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="total_money" label="Tổng tiền">
                <Input prefix="VND" disabled={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="is_payment" label="Trạng thái">
                <Select
                  size="large"
                  showSearch
                  placeholder="Chọn trạng thái"
                  optionFilterProp="children"
                  onChange={(v) => setIsPayment(v)}
                  value={isPayment}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={true}
                >
                  <Option value={true}>Đã thanh toán</Option>
                  <Option value={false}>Chưa thanh toán</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Ghi chú">
                <TextArea
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="created_at" label="Ngày Tạo">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="updated_at" label="Ngày cập nhật">
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    updateVisible: state.order.updateVisible,
    order: state.order.order,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupUpdateOrder);
