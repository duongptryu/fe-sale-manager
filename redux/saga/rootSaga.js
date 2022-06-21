import { all } from "redux-saga/effects";
import { watcherAuth } from "./authSaga";
import { watcherCategory } from "./category";
import { watcherOrder } from "./order";
import { watcherPayment } from "./payment";
import { watcherSaller } from "./seller";
import { watcherStatistic } from "./statistic";

export function* rootSaga() {
  yield all([
    ...watcherAuth,
    ...watcherCategory,
    ...watcherSaller,
    ...watcherOrder,
    ...watcherPayment,
    ...watcherStatistic,
  ]);
}
