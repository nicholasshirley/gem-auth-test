import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import todos from './todos.js'
import { selectedSubreddit, postsBySubreddit } from './reddit.js'

const rootReducer = combineReducers({
  todos,
  postsBySubreddit,
  selectedSubreddit,
  routing: routerReducer
})

export default rootReducer