import {
  ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE,
  ACT_CREATE_PAYMENT_FAILURE,
  ACT_CREATE_PAYMENT_REQUEST,
  ACT_CREATE_PAYMENT_SUCCESS,
  ACT_GET_PAYMENT_WITHOUT_PAGING_FAILURE,
  ACT_GET_PAYMENT_WITHOUT_PAGING_REQUEST,
  ACT_GET_PAYMENT_WITHOUT_PAGING_SUCCESS,
  ACT_UPDATE_PAYMENT_FAILURE,
  ACT_UPDATE_PAYMENT_REQUEST,
  ACT_UPDATE_PAYMENT_SUCCESS,
} from "../action/payment";

export const initPaymentState = {
  updateVisible: false,
  loading: false,
  payment: null,
  err: "",
  reload: false,
  reloadUpdate: false,
  histories: [],
};

export const paymentReducer = (state = initPaymentState, action) => {
  switch (action.type) {
    case ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE:
      return {
        ...state,
        updateVisible: action.payload.status,
        payment: action.payload.payment,
      };

    case ACT_CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        reload: false,
        err: "",
      };
    case ACT_CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        noti: "Thanh toán thành công",
      };
    case ACT_CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };

    case ACT_UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        reloadUpdate: false,
        err: "",
      };
    case ACT_UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        updateVisible: false,
        reloadUpdate: true,
        noti: "Cập nhật thành công",
      };
    case ACT_UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };

    case ACT_GET_PAYMENT_WITHOUT_PAGING_REQUEST:
      return {
        ...state,
        loading: true,
        reload: false,
        err: "",
      };
    case ACT_GET_PAYMENT_WITHOUT_PAGING_SUCCESS:
      return {
        ...state,
        histories: action.response.data.data,
        loading: false,
      };
    case ACT_GET_PAYMENT_WITHOUT_PAGING_FAILURE:
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
