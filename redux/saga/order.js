import { takeEvery } from "redux-saga/effects";
import { apiCall } from "./sagaUtil";
import { getAPI, patchAPI, postAPI } from "../../services/axios/axios";
import {
  ACT_CREATE_ORDER_FAILURE,
  ACT_CREATE_ORDER_REQUEST,
  ACT_CREATE_ORDER_SUCCESS,
  ACT_GET_ORDER_FAILURE,
  ACT_GET_ORDER_REQUEST,
  ACT_GET_ORDER_SUCCESS,
  ACT_GET_ORDER_WITHOUT_PAGING_FAILURE,
  ACT_GET_ORDER_WITHOUT_PAGING_REQUEST,
  ACT_GET_ORDER_WITHOUT_PAGING_SUCCESS,
  ACT_UPDATE_ORDER_FAILURE,
  ACT_UPDATE_ORDER_REQUEST,
  ACT_UPDATE_ORDER_SUCCESS,
} from "../action/order";

const orderGateway = "/sale";

export const watcherOrder = [
  takeEvery(
    ACT_GET_ORDER_WITHOUT_PAGING_REQUEST,
    apiCall(
      getOrderWithoutPaging,
      ACT_GET_ORDER_WITHOUT_PAGING_SUCCESS,
      ACT_GET_ORDER_WITHOUT_PAGING_FAILURE
    )
  ),
  takeEvery(
    ACT_GET_ORDER_WITHOUT_PAGING_REQUEST,
    apiCall(
      getOrderWithoutPaging,
      ACT_GET_ORDER_WITHOUT_PAGING_SUCCESS,
      ACT_GET_ORDER_WITHOUT_PAGING_FAILURE
    )
  ),
  takeEvery(
    ACT_UPDATE_ORDER_REQUEST,
    apiCall(updateOrder, ACT_UPDATE_ORDER_SUCCESS, ACT_UPDATE_ORDER_FAILURE)
  ),
  takeEvery(
    ACT_CREATE_ORDER_REQUEST,
    apiCall(createOrder, ACT_CREATE_ORDER_SUCCESS, ACT_CREATE_ORDER_FAILURE)
  ),
];

function getOrder(action) {
  return getAPI(
    orderGateway,
    {
      name: action.payload.name ?? "",
      cate_id: action.payload.cate_id ?? 0,
      date: action.payload.date ?? "",
      user_id: action.payload.user_id ?? 0,
      from_date: action.payload.from_date ?? "",
      to_date: action.payload.to_date ?? "",
      page: action.payload.page ?? 1,
      limit: action.payload.limit ?? 10,
    },
    action.payload.token
  );
}

function getOrderWithoutPaging(action) {
  return getAPI(
    orderGateway + "/without-paging",
    {
      name: action.payload.name ?? "",
      cate_id: action.payload.cate_id ?? 0,
      is_payment: action.payload.is_payment ?? "",
      date: action.payload.date ?? "",
      user_id: action.payload.user_id ?? 0,
      from_date: action.payload.from_date ?? "",
      to_date: action.payload.to_date ?? "",
    },
    action.payload.token
  );
}

function updateOrder(action) {
  return patchAPI(
    orderGateway,
    action.payload.id,
    action.payload,
    action.payload.token
  );
}

function createOrder(action) {
  return postAPI(orderGateway, action.payload, action.payload.token);
}
