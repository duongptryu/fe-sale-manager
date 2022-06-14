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
import { ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE } from "../../redux/action/category";

const PopupUpdateCategory = (props) => {
  const { updateVisible, category, onChangeVisibleUpdate } = props;
  const [name, setName] = useState("");

  const onClose = () => {
    onChangeVisibleUpdate({
      status: false,
      category: null,
    });
  };
  return (
    <>
      <Drawer
        title="Cập nhật loại hàng"
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
              <p>{category?.id ?? "asdasd"}</p>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Id"
                label="Id"
                initialValue={category?.id ?? "asdasd"}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <Form.Item
                name="Tên"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Nhập tên loại hàng",
                  },
                ]}
              >
                <Input
                  value={name}
                  defaultValue={
                    category
                      ? category.name
                        ? category.name
                        : "Không xác định"
                      : "Không xác định"
                  }
                  placeholder="Nhập tên loại hàng"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="kg_for_bag" label="Số Kg / Túi">
                <Input
                  defaultValue={
                    category
                      ? category.kg_for_bag
                        ? category.kg_for_bag
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="created_at" label="Ngày Tạo">
                <Input
                  defaultValue={
                    category
                      ? category.created_at
                        ? category.created_at
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
                    category
                      ? category.updated_at
                        ? category.updated_at
                        : "Không xác định"
                      : "Không xác định"
                  }
                  disabled={true}
                />
              </Form.Item>
            </Col> */}
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

const mapStateToProp = (state) => {
  console.log("state-------------------------", state);
  return {
    updateVisible: state.category.updateVisible,
    category: state.category.category,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupUpdateCategory);