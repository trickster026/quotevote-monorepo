import * as actions from "../actions/routing.actions"

const defaultState = {
  domain: "",
  domains: []
}

const routing = (state = defaultState, action) => {
  let _state
  switch (action.type) {
    case actions.SET_DOMAIN:
      _state = { ...state, domain: action.payload }
      return _state
    case actions.SET_DOMAIN_LIST:
      _state = { ...state, domains: [...actions.payload] }
      return _state
    default:
      return state
  }
}

export default routing
