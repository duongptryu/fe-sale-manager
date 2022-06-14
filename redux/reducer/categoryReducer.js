import {
  ACT_CHANGE_CREATE_CATE_VISIBLE_STATE,
  ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE,
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
    case ACT_CHANGE_CREATE_CATE_VISIBLE_STATE:
      return {
        ...state,
        createVisible: action.payload,
        // updateVisible: !action.payload,
      };
    case ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE:
      console.log("ACT_CHANGE_UPDATE_CATE_VISIBLE_STATE", action);
      return {
        ...state,
        // createVisible: !action.payload,
        updateVisible: action.payload.status,
        category: action.payload.category,
      };
    default:
      return state;
  }
};
