import {
  ACT_CHANGE_CREATE_ORDER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_ORDER_VISIBLE_STATE,
} from "../action/order";

export const initOrderState = {
  updateVisible: false,
  createVisible: false,
  loading: false,
  order: null,
  newOrder: null,
  err: "",
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
    default:
      return state;
  }
};
