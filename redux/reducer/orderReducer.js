import {
  ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE,
  ACT_CREATE_ORDER_FAILURE,
  ACT_CREATE_ORDER_REQUEST,
  ACT_CREATE_ORDER_SUCCESS,
  ACT_DELETE_ORDER_FAILURE,
  ACT_DELETE_ORDER_REQUEST,
  ACT_DELETE_ORDER_SUCCESS,
  ACT_GET_ORDER_FAILURE,
  ACT_GET_ORDER_REQUEST,
  ACT_GET_ORDER_SUCCESS,
  ACT_GET_ORDER_WITHOUT_PAGING_FAILURE,
  ACT_GET_ORDER_WITHOUT_PAGING_REQUEST,
  ACT_GET_ORDER_WITHOUT_PAGING_SUCCESS,
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
  total: 0,
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
      return { ...state, loading: true, err: "", noti: "" };
    case ACT_GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: false,
        orders: action.response.data.data,
        total: action.response.data.paging.total,
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
        err: "",
        noti: "",
      };
    case ACT_UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        updateVisible: false,
        noti: "C???p nh???t th??nh c??ng",
      };
    case ACT_UPDATE_ORDER_FAILURE:
      console.log("ACT_UPDATE_ORDER_FAILURE", action);
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
        err: "",
        noti: "",
      };
    case ACT_CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        createVisible: false,
        noti: "T???o th??nh c??ng",
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
      return { ...state, err: "", noti: "" };
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
    case ACT_GET_ORDER_WITHOUT_PAGING_REQUEST:
      return { ...state, loading: true, err: "", noti: "" };
    case ACT_GET_ORDER_WITHOUT_PAGING_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: false,
        orders: action.response.data.data,
      };
    case ACT_GET_ORDER_WITHOUT_PAGING_FAILURE:
      return {
        ...state,
        loading: false,
        reload: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };

    case ACT_DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        err: "",
        noti: "",
      };
    case ACT_DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        noti: "X??a th??nh c??ng",
      };
    case ACT_DELETE_ORDER_FAILURE:
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
