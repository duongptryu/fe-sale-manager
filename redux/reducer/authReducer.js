import { setToken } from "../../services/utils/const";
import {
  ACT_AUTHEN_LOGIN_FAILURE,
  ACT_AUTHEN_LOGIN_REQUEST,
  ACT_AUTHEN_LOGIN_SUCCESS,
} from "../action/auth";

export const initAuthenState = {
  token: "",
  loading: false,
  err: "",
};

export const authenReducer = (state = initAuthenState, action) => {
  switch (action.type) {
    case ACT_AUTHEN_LOGIN_REQUEST:
      return { ...state, loading: true, err: "" };
    case ACT_AUTHEN_LOGIN_SUCCESS:
      setToken(action.response.data.data.access_token.token);
      return {
        ...state,
        loading: false,
        token: action.response.data.data.access_token.token,
      };
    case ACT_AUTHEN_LOGIN_FAILURE:
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
