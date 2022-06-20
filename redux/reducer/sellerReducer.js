import {
  ACT_CHANGE_CREATE_SELLER_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_SELLER_VISIBLE_STATE,
  ACT_CREATE_SELLER_FAILURE,
  ACT_CREATE_SELLER_REQUEST,
  ACT_CREATE_SELLER_SUCCESS,
  ACT_GET_A_SELLER_FAILURE,
  ACT_GET_A_SELLER_REQUEST,
  ACT_GET_A_SELLER_SUCCESS,
  ACT_GET_SELLER_FAILURE,
  ACT_GET_SELLER_REQUEST,
  ACT_GET_SELLER_SUCCESS,
  ACT_UPDATE_SELLER_FAILURE,
  ACT_UPDATE_SELLER_REQUEST,
  ACT_UPDATE_SELLER_SUCCESS,
} from "../action/seller";

export const initSellerState = {
  createVisible: false,
  updateVisible: false,
  user: null,
  users: [],
  loading: false,
  err: "",
  noti: "",
  reload: false,
  total: 0,
  aUser: null,
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
    case ACT_GET_SELLER_REQUEST:
      return { ...state, loading: true, err: "" };
    case ACT_GET_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: false,
        users: action.response.data.data,
        total: action.response.data.paging.total,
      };
    case ACT_GET_SELLER_FAILURE:
      return {
        ...state,
        loading: false,
        reload: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };
    case ACT_UPDATE_SELLER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACT_UPDATE_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        updateVisible: false,
        noti: "Cập nhật thành công",
      };
    case ACT_UPDATE_SELLER_FAILURE:
      return {
        ...state,
        loading: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };

    case ACT_CREATE_SELLER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACT_CREATE_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        reload: true,
        createVisible: false,
        noti: "Tạo thành công",
      };
    case ACT_CREATE_SELLER_FAILURE:
      return {
        ...state,
        loading: false,
        err:
          action.response.response.status +
          " " +
          action.response.response.data.message,
      };

    case ACT_GET_A_SELLER_REQUEST:
      return { ...state, loading: true, err: "" };
    case ACT_GET_A_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        aUser: action.response.data.data,
      };
    case ACT_GET_A_SELLER_FAILURE:
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
