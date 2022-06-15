import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
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
import { ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE } from "../../redux/action/payment";

const { TextArea } = Input;

const PopupUpdatePayment = (props) => {
  const { updateVisible, payment, onChangeVisibleUpdate } = props;
  const [note, setNote] = useState("");

  const [form] = Form.useForm();

  const onClose = () => {
    onChangeVisibleUpdate({
      status: false,
    });
  };

  useEffect(() => {
    setNote(payment?.note ?? "Không xác định");
    form.setFieldsValue({
      id: payment?.id ?? "Không xác định",
      list_sale_id: payment?.list_sale_id ?? "Không xác định",
      amount: payment?.amount ?? 0,
      total_money: payment?.total_money ?? 0,
      note: payment?.note ?? "Không xác định",
      payment_date: payment?.payment_date ?? "Không xác định",
      created_at: payment?.created_at ?? "Không xác định",
      updated_at: payment?.updated_at ?? "Không xác định",
    });
  }, [payment]);

  return (
    <>
      <Drawer
        title="Cập nhật ghi chú"
        width={450}
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
              <Form.Item name="list_sale_id" label="Danh sách id">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="amount" label="Tổng cân">
                <InputNumber
                  disabled={true}
                  prefix="Kg"
                  style={{ width: 200 }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="total_money" label="Tổng tiền">
                <InputNumber
                  disabled={true}
                  prefix="VND"
                  style={{ width: 200 }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="payment_date" label="Ngày thanh toán">
                <Input disabled={true} />
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
    updateVisible: state.payment.updateVisible,
    payment: state.payment.payment,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupUpdatePayment);
