import { combineReducers } from "redux";
import { authenReducer, initAuthenState } from "./authReducer";

export const initRootState = {
  authen: { ...initAuthenState },
};

export const rootReducer = combineReducers({
  authen: authenReducer,
});
