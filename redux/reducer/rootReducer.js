import { combineReducers } from "redux";
import { authenReducer, initAuthenState } from "./authReducer";
import { categoryReducer, initCateState } from "./categoryReducer";
import { initOrderState, orderReducer } from "./orderReducer";
import { initPaymentState, paymentReducer } from "./paymentReducer";
import { initSellerState, sellerReducer } from "./sellerReducer";

export const initRootState = {
  authen: { ...initAuthenState },
  category: { ...initCateState },
  seller: { ...initSellerState },
  order: { ...initOrderState },
  payment: { ...initPaymentState },
};

export const rootReducer = combineReducers({
  authen: authenReducer,
  category: categoryReducer,
  seller: sellerReducer,
  order: orderReducer,
  payment: paymentReducer,
});
