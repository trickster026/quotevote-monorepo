import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import artist from "./artistReducer"
import login from "./loginReducer"

const rootReducer = combineReducers({
  artist,
  login
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

export default store
