import {
  LOGIN
} from '../actions'

export function userLogin(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.data
    default:
      return state
  }
}