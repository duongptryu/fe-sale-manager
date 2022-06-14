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
import formatNumber from "../../services/utils/number";

const { TextArea } = Input;
const { Option } = Select;

const PopupUpdateOrder = (props) => {
  const { updateVisible, order, onChangeVisibleUpdate } = props;
  const [price, setPrice] = useState(
    order ? (order.price ? order.price : 0) : 0
  );
  const [amount, setAmount] = useState(
    order ? (order.amount ? order.amount : 0) : 0
  );
  const [cateId, setCateId] = useState(null);
  const [isPayment, setIsPayment] = useState(
    order ? (order.is_payment ? order.is_payment : false) : false
  );
  const [note, setNote] = useState(order ? (order.note ? order.note : "") : "");
  const [bagNumber, setBagNumber] = useState(
    order ? (order.bag_number ? order.bag_number : 0) : 0
  );
  const [isInputKg, setIsInputKg] = useState(false);

  const onClose = () => {
    onChangeVisibleUpdate({
      status: false,
      order: null,
    });
  };

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
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="Id" label="Id">
                <Input
                  defaultValue={
                    order
                      ? order.id
                        ? order.id
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="name" label="Tên người bán">
                <Input
                  defaultValue={
                    order
                      ? order.name
                        ? order.name
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phone_number" label="Số điện thoại">
                <Input
                  defaultValue={
                    order
                      ? order.phone_number
                        ? order.phone_number
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
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
                  defaultValue={
                    order
                      ? order.cate_id
                        ? order.cate_id
                        : "Không xác định"
                      : "Không xác định"
                  }
                  value={cateId}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="price" label="Giá / Kg">
                <Input
                  defaultValue={
                    order
                      ? order.price
                        ? order.price
                        : "Không xác định"
                      : "Không xác định"
                  }
                  prefix="VND"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="bag_number" label="Nhập số cân nặng">
                <Checkbox
                  onChange={(e) => {
                    setIsInputKg(e.target.checked);
                    setBagNumber(0);
                    setAmount(0);
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
                  defaultValue={
                    order
                      ? order.bag_number
                        ? order.bag_number
                        : "Không xác định"
                      : "Không xác định"
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Tổng cân">
                <Input
                  defaultValue={
                    order
                      ? order.amount
                        ? order.amount
                        : "Không xác định"
                      : "Không xác định"
                  }
                  prefix="Kg"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  value={note}
                  disabled={!isInputKg}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Tổng tiền">
                <Input
                  defaultValue={formatNumber(amount * price)}
                  value={formatNumber(amount * price)}
                  prefix="VND"
                  disabled={true}
                />
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
                  defaultValue={
                    order
                      ? order.is_payment
                        ? order.is_payment
                        : "Không xác định"
                      : "Không xác định"
                  }
                  value={isPayment}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="true">Đã thanh toán</Option>
                  <Option value="false">Chưa thanh toán</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Ghi chú">
                <TextArea
                  rows={4}
                  value={note}
                  defaultValue={
                    order
                      ? order.note
                        ? order.note
                        : "Không xác định"
                      : "Không xác định"
                  }
                  onChange={(e) => setNote(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="created_at" label="Ngày Tạo">
                <Input
                  defaultValue={
                    order
                      ? order.created_at
                        ? order.created_at
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="updated_at" label="Ngày cập nhật">
                <Input
                  defaultValue={
                    order
                      ? order.updated_at
                        ? order.updated_at
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
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
