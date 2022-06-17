import {
  ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE,
  ACT_CREATE_PAYMENT_FAILURE,
  ACT_CREATE_PAYMENT_REQUEST,
  ACT_CREATE_PAYMENT_SUCCESS,
} from "../action/payment";

export const initPaymentState = {
  updateVisible: false,
  loading: false,
  payment: null,
  err: "",
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

    default:
      return state;
  }
};
