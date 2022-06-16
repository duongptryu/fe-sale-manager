import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE,
  ACT_UPDATE_CATEGORY_REQUEST,
} from "../../redux/action/category";
import { getToken } from "../../services/utils/const";

const PopupUpdateCategory = (props) => {
  const {
    updateVisible,
    category,
    onChangeVisibleUpdate,
    onUpdateCategory,
  } = props;
  const [name, setName] = useState();

  const onClose = () => {
    onChangeVisibleUpdate({
      status: false,
      category: null,
    });
  };

  const handleUpdateCategory = () => {
    onUpdateCategory({
      id: category?.id ?? 0,
      name: name,
      token: getToken(),
    });
  };

  useEffect(() => {
    setName(category?.name ?? "Không xác định");
  }, [category]);
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
            <Button onClick={handleUpdateCategory} type="primary">
              Cập nhật
            </Button>
          </Space>
        }
      >
        <Row gutter={24}>
          <Col span={24} style={{ marginBottom: "30px" }}>
            <p>Id </p>
            <Input disabled={true} value={category?.id ?? "Không xác định"} />
          </Col>
          <Col span={24} style={{ marginBottom: "30px" }}>
            <p>Tên</p>
            <Input
              value={name}
              placeholder="Nhập tên loại hàng"
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col span={24} style={{ marginBottom: "30px" }}>
            <p>Số Kg / Túi</p>
            <Input
              value={category?.kg_for_bag ?? "Không xác định"}
              disabled={true}
            />
          </Col>
          <Col span={24} style={{ marginBottom: "30px" }}>
            <p>Ngày Tạo</p>
            <Input
              value={category?.created_at ?? "Không xác định"}
              disabled={true}
            />
          </Col>
          <Col span={24} style={{ marginBottom: "30px" }}>
            <p>Ngày cập nhật</p>
            <Input
              value={category?.updated_at ?? "Không xác định"}
              disabled={true}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

const mapStateToProp = (state) => {
  return {
    updateVisible: state.category.updateVisible,
    category: state.category.category,
  };
};

const mapDispatchToProp = (dispath) => ({
  onChangeVisibleUpdate: (payload) =>
    dispath({ type: ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE, payload }),
  onUpdateCategory: (payload) => {
    dispath({
      type: ACT_UPDATE_CATEGORY_REQUEST,
      payload,
    });
  },
});

export default connect(mapStateToProp, mapDispatchToProp)(PopupUpdateCategory);
