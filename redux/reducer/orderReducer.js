import {
  ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE,
  ACT_CREATE_ORDER_FAILURE,
  ACT_CREATE_ORDER_REQUEST,
  ACT_CREATE_ORDER_SUCCESS,
  ACT_GET_ORDER_FAILURE,
  ACT_GET_ORDER_REQUEST,
  ACT_GET_ORDER_SUCCESS,
  ACT_UPDATE_ORDER_FAILURE,
  ACT_UPDATE_ORDER_REQUEST,
  ACT_UPDATE_ORDER_SUCCESS,
} from "../action/order";
import {
  ACT_GET_SELLER_WITHOUT_PAGING_FAILURE,
  ACT_GET_SELLER_WITHOUT_PAGING_REQUEST,
  ACT_GET_SELLER_WITHOUT_PAGING_SUCCESS,
} from "../action/seller";

export const initOrderState = {
  updateVisible: false,
  createVisible: false,
  loading: false,
  order: null,
  newOrder: null,
  err: "",
  noti: "",
  sellers: [],
  orders: [],
};

export const orderReducer = (state = initOrderState, action) => {
  switch (action.type) {
    case ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE:
      return {
        ...state,
        updateVisible: action.payload.status,
        order: action.payload.order,
      };
    case ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE:
      return {
        ...state,
        createVisible: action.payload.status,
      };
    case ACT_GET_ORDER_REQUEST:
      return { ...state, loading: true, err: "" };
    case ACT_GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: false,
        orders: action.response.data.data,
      };
    case ACT_GET_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        reload: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };
    case ACT_UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACT_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        updateVisible: false,
        noti: "Cập nhật thành công",
      };
    case ACT_UPDATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };

    case ACT_CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACT_CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        createVisible: false,
        noti: "Tạo thành công",
      };
    case ACT_CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };

    case ACT_GET_SELLER_WITHOUT_PAGING_REQUEST:
      return { ...state, err: "" };
    case ACT_GET_SELLER_WITHOUT_PAGING_SUCCESS:
      return {
        ...state,
        sellers: action.response.data.data,
      };
    case ACT_GET_SELLER_WITHOUT_PAGING_FAILURE:
      return {
        ...state,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };
    default:
      return state;
  }
};
