import { createStore, combineReducers, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import localForage from "localforage"
import thunk from "redux-thunk"
import artist from "./artistReducer"
import login from "./loginReducer"
import signup from "./signupReducer"

const rootReducer = combineReducers({
  artist,
  login,
  signup
})

const persistConfig = {
  key: "root",
  storage: localForage,
  blacklist: ["artist"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(thunk)
// )

export const persistor = persistStore(store)

export default store
