import { combineReducers } from "redux";
import { authenReducer, initAuthenState } from "./authReducer";
import { categoryReducer, initCateState } from "./categoryReducer";
import { initOrderState, orderReducer } from "./orderReducer";
import { initSellerState, sellerReducer } from "./sellerReducer";

export const initRootState = {
  authen: { ...initAuthenState },
  category: { ...initCateState },
  selelr: { ...initSellerState },
  order: { ...initOrderState },
};

export const rootReducer = combineReducers({
  authen: authenReducer,
  category: categoryReducer,
  seller: sellerReducer,
  order: orderReducer,
});
