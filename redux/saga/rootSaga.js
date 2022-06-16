import { all } from "redux-saga/effects";
import { watcherAuth } from "./authSaga";
import { watcherCategory } from "./category";
import { watcherOrder } from "./order";
import { watcherSaller } from "./seller";

export function* rootSaga() {
  yield all([
    ...watcherAuth,
    ...watcherCategory,
    ...watcherSaller,
    ...watcherOrder,
  ]);
}
