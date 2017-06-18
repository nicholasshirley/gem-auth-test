import {
  REGISTER
} from '../actions'

export function userRegister(state = {}, action) {
  switch (action.type) {
    case REGISTER:
      return action.data
    default:
      return state
  }
}