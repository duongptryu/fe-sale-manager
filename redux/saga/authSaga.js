import {
  ACT_AUTHEN_LOGIN_FAILURE,
  ACT_AUTHEN_LOGIN_REQUEST,
  ACT_AUTHEN_LOGIN_SUCCESS,
} from "../action/auth";

import { takeEvery } from "redux-saga/effects";
import { apiCall } from "./sagaUtil";
import { authPostAPI } from "../../services/axios/axios";

export const watcherAuth = [
  takeEvery(
    ACT_AUTHEN_LOGIN_REQUEST,
    apiCall(login, ACT_AUTHEN_LOGIN_SUCCESS, ACT_AUTHEN_LOGIN_FAILURE)
  ),
];

function login(action) {
  const url = "";
  const data = {
    username: action.payload.username,
    password: action.payload.password,
  };
  return authPostAPI(url, data);
}
