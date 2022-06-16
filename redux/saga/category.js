import { takeEvery } from "redux-saga/effects";
import { apiCall } from "./sagaUtil";
import { getAPI, patchAPI, postAPI } from "../../services/axios/axios";
import {
  ACT_CREATE_CATEGORY_FAILURE,
  ACT_CREATE_CATEGORY_REQUEST,
  ACT_CREATE_CATEGORY_SUCCESS,
  ACT_GET_CATEGORY_FAILURE,
  ACT_GET_CATEGORY_REQUEST,
  ACT_GET_CATEGORY_SUCCESS,
  ACT_UPDATE_CATEGORY_FAILURE,
  ACT_UPDATE_CATEGORY_REQUEST,
  ACT_UPDATE_CATEGORY_SUCCESS,
} from "../action/category";

const categoryGateway = "/category";

export const watcherCategory = [
  takeEvery(
    ACT_GET_CATEGORY_REQUEST,
    apiCall(getCategory, ACT_GET_CATEGORY_SUCCESS, ACT_GET_CATEGORY_FAILURE)
  ),
  takeEvery(
    ACT_UPDATE_CATEGORY_REQUEST,
    apiCall(
      updateCategory,
      ACT_UPDATE_CATEGORY_SUCCESS,
      ACT_UPDATE_CATEGORY_FAILURE
    )
  ),
  takeEvery(
    ACT_CREATE_CATEGORY_REQUEST,
    apiCall(
      createCategory,
      ACT_CREATE_CATEGORY_SUCCESS,
      ACT_CREATE_CATEGORY_FAILURE
    )
  ),
];

function getCategory(action) {
  return getAPI(categoryGateway, null, action.payload.token);
}

function updateCategory(action) {
  return patchAPI(
    categoryGateway,
    action.payload.id,
    action.payload,
    action.payload.token
  );
}

function createCategory(action) {
  return postAPI(categoryGateway, action.payload, action.payload.token);
}
