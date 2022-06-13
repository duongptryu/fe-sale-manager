import { call, put } from "redux-saga/effects";

function* sagaCall(action) {
  try {
    var resp = yield call(this.execute, action);
    yield put({ type: this.success, response: resp, payload: action.payload });
  } catch (err) {
    console.error(
      `Error ${action.type}:${this.failure}: ${JSON.stringify(err)}`
    );
    yield put({ type: this.failure, payload: action.payload, response: err });
  }
}

export function apiCall(execute, success, failure) {
  return sagaCall.bind({ execute, success, failure });
}
