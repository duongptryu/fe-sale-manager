import { setToken } from "../../services/utils/const";
import {
  ACT_CHANGE_CREATE_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_VISIBLE_STATE,
} from "../action/category";

export const initCateState = {
  createVisible: false,
  updateVisible: false,
  category: null,
  loading: false,
  name: "",
  err: "",
};

export const categoryReducer = (state = initCateState, action) => {
  switch (action.type) {
    case ACT_CHANGE_CREATE_VISIBLE_STATE:
      return { ...state, createVisible: true, updateVisible: false };
    case ACT_CHANGE_UPDATE_VISIBLE_STATE:
      return { ...state, createVisible: false, updateVisible: true };
    default:
      return state;
  }
};
