import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE } from "../../redux/action/seller";

const { TextArea } = Input;

const PopupUpdateSeller = (props) => {
  const { updateVisible, user, onChangeVisibleUpdate } = props;
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const [form] = Form.useForm();

  const onClose = () => {
    onChangeVisibleUpdate({
      status: false,
      user: null,
    });
  };

  useEffect(() => {
    setName(user?.name ?? "Không xác định");
    setNote(user?.note ?? "Không xác định");
    form.setFieldsValue({
      id: user?.id ?? "Không xác định",
      name: user?.name ?? "Không xác định",
      phone_number: user?.phone_number ?? "Không xác định",
      note: user?.note ?? "Không xác định",
      created_at: user?.created_at ?? "Không xác định",
      updated_at: user?.updated_at ?? "Không xác định",
    });
  }, [user]);

  return (
    <>
      <Drawer
        title="Cập nhật người bán"
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
              <Form.Item
                name="name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Nhập tên người bán",
                  },
                ]}
              >
                <Input
                  value={name}
                  placeholder="Nhập tên người bán"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phone_number" label="Số điện thoại">
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
    updateVisible: state.seller.updateVisible,
    user: state.seller.user,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupUpdateSeller);
