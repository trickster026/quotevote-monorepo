import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import localForage from "localforage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import * as reducers from "reducers";

const rootReducer = combineReducers({ ...reducers });
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

const persistConfig = {
  key: "root",
  storage: localForage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;