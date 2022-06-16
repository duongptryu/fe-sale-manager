import { takeEvery } from "redux-saga/effects";
import { apiCall } from "./sagaUtil";
import { getAPI, patchAPI, postAPI } from "../../services/axios/axios";
import {
  ACT_CREATE_SELLER_FAILURE,
  ACT_CREATE_SELLER_REQUEST,
  ACT_CREATE_SELLER_SUCCESS,
  ACT_GET_SELLER_FAILURE,
  ACT_GET_SELLER_REQUEST,
  ACT_GET_SELLER_SUCCESS,
  ACT_GET_SELLER_WITHOUT_PAGING_FAILURE,
  ACT_GET_SELLER_WITHOUT_PAGING_REQUEST,
  ACT_GET_SELLER_WITHOUT_PAGING_SUCCESS,
  ACT_UPDATE_SELLER_FAILURE,
  ACT_UPDATE_SELLER_REQUEST,
  ACT_UPDATE_SELLER_SUCCESS,
} from "../action/seller";

const sellerGateway = "/user";

export const watcherSaller = [
  takeEvery(
    ACT_GET_SELLER_REQUEST,
    apiCall(getSeller, ACT_GET_SELLER_SUCCESS, ACT_GET_SELLER_FAILURE)
  ),
  takeEvery(
    ACT_UPDATE_SELLER_REQUEST,
    apiCall(updateSeller, ACT_UPDATE_SELLER_SUCCESS, ACT_UPDATE_SELLER_FAILURE)
  ),
  takeEvery(
    ACT_CREATE_SELLER_REQUEST,
    apiCall(createSeller, ACT_CREATE_SELLER_SUCCESS, ACT_CREATE_SELLER_FAILURE)
  ),
  takeEvery(
    ACT_GET_SELLER_WITHOUT_PAGING_REQUEST,
    apiCall(
      getSellerWithoutPaging,
      ACT_GET_SELLER_WITHOUT_PAGING_SUCCESS,
      ACT_GET_SELLER_WITHOUT_PAGING_FAILURE
    )
  ),
];

function getSeller(action) {
  return getAPI(
    sellerGateway,
    {
      page: action.payload.page,
      limit: action.payload.limit,
      name: action.payload.name ?? "",
      phone_number: action.payload.phone_number ?? "",
    },
    action.payload.token
  );
}

function getSellerWithoutPaging(action) {
  return getAPI(sellerGateway + "/without-paging", null, action.payload.token);
}

function updateSeller(action) {
  return patchAPI(
    sellerGateway,
    action.payload.id,
    action.payload,
    action.payload.token
  );
}

function createSeller(action) {
  return postAPI(sellerGateway, action.payload, action.payload.token);
}
