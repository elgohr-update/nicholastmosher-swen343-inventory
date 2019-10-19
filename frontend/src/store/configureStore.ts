import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

export const configureStore = () => createStore(
  rootReducer,
  compose(
    applyMiddleware(
      createLogger({ level: "info", collapsed: true })
    )
  )
);
