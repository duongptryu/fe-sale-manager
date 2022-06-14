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
import React, { useState } from "react";
import { connect } from "react-redux";
import { ACT_CHANGE_CREATE_CATE_VISIBLE_STATE } from "../../redux/action/category";

const PopupCreateCategory = (props) => {
  const { createVisible, onChangeVisible } = props;
  const [bagNumber, setBagNumber] = useState(0);
  const [name, setName] = useState("");

  const onClose = () => {
    onChangeVisible(false);
  };

  return (
    <>
      <Drawer
        title="Tạo mới loại hàng"
        width={360}
        onClose={onClose}
        visible={createVisible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Hủy</Button>
            <Button onClick={onClose} type="primary">
              Tạo
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={24}>
            <Col span={24}>
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
                  placeholder="Nhập tên loại hàng"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="kg_for_bag" label="Số Kg / Túi">
                <InputNumber
                  value={bagNumber}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(e) => setBagNumber(e)}
                  prefix="Kg"
                  size="large"
                  min={0}
                  style={{ width: 200 }}
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
  console.log(state);
  return {
    createVisible: state.category.createVisible,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisible: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_CATE_VISIBLE_STATE, payload }),
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupCreateCategory);