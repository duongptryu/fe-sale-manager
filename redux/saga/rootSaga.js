import { all } from "redux-saga/effects";
import { watcherAuth } from "./authSaga";

export function* rootSaga() {
  yield all([...watcherAuth]);
}
