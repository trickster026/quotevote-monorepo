import { createStore } from "redux"
import { cloneDeep } from "lodash"
import * as types from "../actions/types"

const defaultState = {
  availableVotes: 100,
  hasInitializeLyrics: false
}

const reducer = (state = defaultState, action) => {
  let _state
  switch (action.type) {
    case types.INITIALIZE_VERSES:
      _state = { ...state }
      _state.verses = action.payload
      _state.hasInitializeLyrics = true
      return _state

    case types.DEDUCT_AVAILABLE_VOTES:
      _state = { ...state }
      return _state

    case types.REPLACE_VERSES:
      const payload = action.payload
      _state = cloneDeep(state)
      _state.verses[payload.index] = { ...payload }
      _state.availableVotes = _state.availableVotes - 1
      return _state

    case types.ADD_SCORE:
      _state = { ...state }
      return _state

    default:
      return state
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
