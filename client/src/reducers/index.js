import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as notifications}    from 'react-notification-system-redux';

import todos from './todos'
import { selectedSubreddit, postsBySubreddit } from './reddit'
import { userRegister } from './register'

const rootReducer = combineReducers({
  notifications,
  todos,
  postsBySubreddit,
  selectedSubreddit,
  userRegister,
  routing: routerReducer
})

export default rootReducer