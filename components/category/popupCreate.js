import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ACT_CHANGE_CREATE_CATE_VISIBLE_STATE,
  ACT_CREATE_CATEGORY_REQUEST,
} from "../../redux/action/category";
import { getToken } from "../../services/utils/const";

const PopupCreateCategory = (props) => {
  const { createVisible, onChangeVisible, onCreateCategory } = props;
  const [kgForBag, setKgForBag] = useState(0);
  const [name, setName] = useState("");

  const onClose = () => {
    onChangeVisible(false);
  };

  const onCreate = () => {
    onCreateCategory({
      name: name,
      kg_for_bag: kgForBag,
      token: getToken(),
    });
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
            <Button onClick={onCreate} type="primary">
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
                  value={kgForBag}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={(e) => setKgForBag(e)}
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
  return {
    createVisible: state.category.createVisible,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisible: (payload) =>
    dispath({ type: ACT_CHANGE_CREATE_CATE_VISIBLE_STATE, payload }),
  onCreateCategory: (payload) => {
    dispath({ type: ACT_CREATE_CATEGORY_REQUEST, payload });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupCreateCategory);
