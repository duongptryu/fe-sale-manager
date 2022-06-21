import { takeEvery } from "redux-saga/effects";
import { getAPI } from "../../services/axios/axios";
import {
  ACT_GET_STATISTIC_A_USER_SALE_FAILED,
  ACT_GET_STATISTIC_A_USER_SALE_REQUEST,
  ACT_GET_STATISTIC_A_USER_SALE_SUCCESS,
} from "../action/statistic";
import { apiCall } from "./sagaUtil";

const statisticGateway = "/statistic";

export const watcherStatistic = [
  takeEvery(
    ACT_GET_STATISTIC_A_USER_SALE_REQUEST,
    apiCall(
      getStatisticAUserSale,
      ACT_GET_STATISTIC_A_USER_SALE_SUCCESS,
      ACT_GET_STATISTIC_A_USER_SALE_FAILED
    )
  ),
];

function getStatisticAUserSale(action) {
  return getAPI(
    statisticGateway + "/user-sale/" + action.payload.id,
    {
      year: action.payload.year ?? 0,
    },
    action.payload.token
  );
}
