import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { initRootState, rootReducer } from "../reducer/rootReducer";
import { rootSaga } from "../saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  preloadedState: { ...initRootState },
});

sagaMiddleware.run(rootSaga);
