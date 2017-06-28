import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {reducer as notifications}    from 'react-notification-system-redux';

import todos from './todos'
import { selectedSubreddit, postsBySubreddit } from './reddit'
import { userRegister } from './register'
import { userLogin } from './login'
import { notes } from './notes'

const rootReducer = combineReducers({
  notifications,
  
  todos,
  postsBySubreddit,
  selectedSubreddit,

  notes,
  userRegister,
  userLogin,
  routing: routerReducer
})

export default rootReducer