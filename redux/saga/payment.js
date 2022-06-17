import { takeEvery } from "redux-saga/effects";
import { apiCall } from "./sagaUtil";
import { getAPI, patchAPI, postAPI } from "../../services/axios/axios";
import {
  ACT_CREATE_PAYMENT_FAILURE,
  ACT_CREATE_PAYMENT_REQUEST,
  ACT_CREATE_PAYMENT_SUCCESS,
  ACT_GET_PAYMENT_WITHOUT_PAGING_FAILURE,
  ACT_GET_PAYMENT_WITHOUT_PAGING_REQUEST,
  ACT_GET_PAYMENT_WITHOUT_PAGING_SUCCESS,
  ACT_UPDATE_PAYMENT_FAILURE,
  ACT_UPDATE_PAYMENT_REQUEST,
  ACT_UPDATE_PAYMENT_SUCCESS,
} from "../action/payment";

const paymentGateway = "/payment";

export const watcherPayment = [
  takeEvery(
    ACT_CREATE_PAYMENT_REQUEST,
    apiCall(
      createPayment,
      ACT_CREATE_PAYMENT_SUCCESS,
      ACT_CREATE_PAYMENT_FAILURE
    )
  ),
  takeEvery(
    ACT_GET_PAYMENT_WITHOUT_PAGING_REQUEST,
    apiCall(
      getOrderWithoutPayment,
      ACT_GET_PAYMENT_WITHOUT_PAGING_SUCCESS,
      ACT_GET_PAYMENT_WITHOUT_PAGING_FAILURE
    )
  ),
  takeEvery(
    ACT_UPDATE_PAYMENT_REQUEST,
    apiCall(
      updatePaymentHistory,
      ACT_UPDATE_PAYMENT_SUCCESS,
      ACT_UPDATE_PAYMENT_FAILURE
    )
  ),
];

function getOrderWithoutPayment(action) {
  return getAPI(
    paymentGateway + "/without-paging",
    {
      cate_id: action.payload.cate_id ?? 0,
      user_id: action.payload.user_id ?? 0,
      from_date: action.payload.from_date ?? "",
      to_date: action.payload.to_date ?? "",
    },
    action.payload.token
  );
}

// function getOrderWithoutPaging(action) {
//   return getAPI(
//     paymentGateway + "/without-paging",
//     {
//       name: action.payload.name ?? "",
//       cate_id: action.payload.cate_id ?? 0,
//       is_payment: action.payload.is_payment ?? "",
//       date: action.payload.date ?? "",
//       user_id: action.payload.user_id ?? 0,
//       from_date: action.payload.from_date ?? "",
//       to_date: action.payload.to_date ?? "",
//     },
//     action.payload.token
//   );
// }

function updatePaymentHistory(action) {
  return patchAPI(
    paymentGateway,
    action.payload.id,
    action.payload,
    action.payload.token
  );
}

function createPayment(action) {
  return postAPI(paymentGateway, action.payload, action.payload.token);
}
