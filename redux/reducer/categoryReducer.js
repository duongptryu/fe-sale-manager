import {
  ACT_CHANGE_CREATE_CATE_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE,
  ACT_CREATE_CATEGORY_FAILURE,
  ACT_CREATE_CATEGORY_REQUEST,
  ACT_CREATE_CATEGORY_SUCCESS,
  ACT_GET_CATEGORY_FAILURE,
  ACT_GET_CATEGORY_REQUEST,
  ACT_GET_CATEGORY_SUCCESS,
  ACT_UPDATE_CATEGORY_FAILURE,
  ACT_UPDATE_CATEGORY_REQUEST,
  ACT_UPDATE_CATEGORY_SUCCESS,
} from "../action/category";
import { ACT_CHANGE_ORDER_NOTI } from "../action/order";

export const initCateState = {
  createVisible: false,
  updateVisible: false,
  category: null,
  categories: [],
  loading: false,
  err: "",
  noti: "",
  reload: false,
};

export const categoryReducer = (state = initCateState, action) => {
  switch (action.type) {
    case ACT_CHANGE_CREATE_CATE_VISIBLE_STATE:
      return {
        ...state,
        createVisible: action.payload,
        // updateVisible: !action.payload,
      };
    case ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE:
      return {
        ...state,
        // createVisible: !action.payload,
        updateVisible: action.payload.status,
        category: action.payload.category,
      };
    case ACT_GET_CATEGORY_REQUEST:
      return { ...state, loading: true, err: "", noti: "" };
    case ACT_GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: false,
        categories: action.response.data.data,
      };
    case ACT_GET_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        reload: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };
    case ACT_UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        err: "",
        noti: "",
      };
    case ACT_UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        updateVisible: false,
        noti: "Cập nhật thành công",
      };
    case ACT_UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };

    case ACT_CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        err: "",
        noti: "",
      };
    case ACT_CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        createVisible: false,
        noti: "Tạo thành công",
      };
    case ACT_CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };
    default:
      return state;
  }
};
