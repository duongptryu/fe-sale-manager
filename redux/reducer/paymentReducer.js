import { ACT_CHANGE_UPDATE_PAYMENT_VISIBLE_STATE } from "../action/payment";

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
    default:
      return state;
  }
};
