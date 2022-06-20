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
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE,
  ACT_CREATE_SELLER_REQUEST,
} from "../../redux/action/seller";
import { getToken } from "../../services/utils/const";

const { TextArea } = Input;

const PopupCreateSeller = (props) => {
  const { createVisible, onChangeVisible, onCreateSeller, reload } = props;
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");

  const [form] = Form.useForm();

  const onClose = () => {
    onChangeVisible(false);
  };

  const onCreate = () => {
    onCreateSeller({
      name: name,
      phone_number: phoneNumber,
      note: note,
      token: getToken(),
    });
  };

  useEffect(() => {
    if (reload) {
      form.resetFields();
    }
  }, [reload]);

  return (
    <>
      <Drawer
        title="Tạo mới người bán"
        width={450}
        onClose={onClose}
        visible={createVisible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={onCreate} type="primary">
              Tạo
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Nhập tên",
                  },
                ]}
              >
                <Input
                  value={name}
                  placeholder="Nhập tên"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="phone_number"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Nhập số điện thoại",
                  },
                ]}
              >
                <Input
                  value={phoneNumber}
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                name="note"
                label="Ghi chú"
                rules={[
                  {
                    required: true,
                    message: "Ghi chú",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  value={note}
                  placeholder="Ghi chú"
                  onChange={(e) => setNote(e.target.value)}
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
    createVisible: state.seller.createVisible,
    reload: state.seller.reload,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisible: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE, payload }),
  onCreateSeller: (payload) => {
    dispath({ type: ACT_CREATE_SELLER_REQUEST, payload });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupCreateSeller);
