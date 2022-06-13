import { combineReducers } from "redux";
import { authenReducer, initAuthenState } from "./authReducer";
import { categoryReducer, initCateState } from "./categoryReducer";

export const initRootState = {
  authen: { ...initAuthenState },
  category: { ...initCateState },
};

export const rootReducer = combineReducers({
  authen: authenReducer,
  category: categoryReducer,
});
