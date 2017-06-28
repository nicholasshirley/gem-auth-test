import {
  GET_ALL_NOTES
} from '../actions'

export function notes(state = {}, action) {
  switch (action.type) {
    case GET_ALL_NOTES:
      return action.data
    default:
      return state
  }
}