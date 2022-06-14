import {
  ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE,
} from "../action/seller";

export const initSellerState = {
  createVisible: false,
  updateVisible: false,
  user: null,
  loading: false,
  newUser: null,
  err: "",
};

export const sellerReducer = (state = initSellerState, action) => {
  switch (action.type) {
    case ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE:
      return {
        ...state,
        createVisible: action.payload,
      };
    case ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE:
      return {
        ...state,
        updateVisible: action.payload.status,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
