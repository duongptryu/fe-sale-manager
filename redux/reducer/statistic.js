import {
  ACT_GET_STATISTIC_A_USER_SALE_FAILED,
  ACT_GET_STATISTIC_A_USER_SALE_REQUEST,
  ACT_GET_STATISTIC_A_USER_SALE_SUCCESS,
} from "../action/statistic";

export const initStatisticState = {
  a_user_sale: null,
  loading_user_sale: false,
  err: "",
  noti: "",
};

export const statisticReducer = (state = initStatisticState, action) => {
  switch (action.type) {
    case ACT_GET_STATISTIC_A_USER_SALE_REQUEST:
      return { ...state, loading_user_sale: true, err: "", noti: "" };
    case ACT_GET_STATISTIC_A_USER_SALE_SUCCESS:
      return {
        ...state,
        loading_user_sale: false,
        a_user_sale: action.response.data.data,
      };
    case ACT_GET_STATISTIC_A_USER_SALE_FAILED:
      return {
        ...state,
        loading_user_sale: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };
    default:
      return state;
  }
};
