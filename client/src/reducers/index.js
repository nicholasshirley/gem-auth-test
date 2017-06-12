import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import todos from './todos'
import { selectedSubreddit, postsBySubreddit } from './reddit'

const rootReducer = combineReducers({
  todos,
  postsBySubreddit,
  selectedSubreddit,
  routing: routerReducer
})

export default rootReducer