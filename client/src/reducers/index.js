import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import todos from './todos'
import { selectedSubreddit, postsBySubreddit } from './reddit'
import { userRegister } from './register'

const rootReducer = combineReducers({
  todos,
  postsBySubreddit,
  selectedSubreddit,
  userRegister,
  routing: routerReducer
})

export default rootReducer