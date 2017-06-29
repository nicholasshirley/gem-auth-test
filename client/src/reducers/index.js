import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as notifications}    from 'react-notification-system-redux';

import { selectedSubreddit, postsBySubreddit } from './reddit'

import {
  LOGIN, REGISTER, GET_ALL_NOTES
} from '../actions'

const rootReducer = combineReducers({
  notifications,
  
  postsBySubreddit,
  selectedSubreddit,

  notes,
  userRegister,
  userLogin,
  routing: routerReducer
})

export default rootReducer

/*
|--------------------------------------------------
| All Reducers
|--------------------------------------------------
*/
function userLogin(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.data
    default:
      return state
  }
}

function userRegister(state = {}, action) {
  switch (action.type) {
    case REGISTER:
      return action.data
    default:
      return state
  }
}

function notes(state = {}, action) {
  switch (action.type) {
    case GET_ALL_NOTES:
      return action.data
    default:
      return state
  }
}