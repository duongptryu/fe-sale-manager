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
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE } from "../../redux/action/seller";

const { TextArea } = Input;

const PopupUpdateSeller = (props) => {
  const { updateVisible, user, onChangeVisibleUpdate } = props;
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const onClose = () => {
    onChangeVisibleUpdate({
      status: false,
      user: null,
    });
  };

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
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="Id" label="Id">
                <Input
                  defaultValue={
                    user
                      ? user.id
                        ? user.id
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
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
                  defaultValue={
                    user
                      ? user.name
                        ? user.name
                        : "Không xác định"
                      : "Không xác định"
                  }
                  placeholder="Nhập tên người bán"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="phone_number" label="Số điện thoại">
                <Input
                  defaultValue={
                    user
                      ? user.phone_number
                        ? user.phone_number
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Ghi chú">
                <TextArea
                  rows={4}
                  value={note}
                  defaultValue={
                    user
                      ? user.note
                        ? user.note
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
                    user
                      ? user.created_at
                        ? user.created_at
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
                    user
                      ? user.updated_at
                        ? user.updated_at
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
    updateVisible: state.seller.updateVisible,
    user: state.seller.user,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupUpdateSeller);
