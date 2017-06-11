import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducers/index.js'
import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from './actions/index.js'


// Add the reducer to your store on the `routing` key
const store = createStore(
  rootReducer,
  applyMiddleware(
    logger, // neat middleware that logs actions
    thunkMiddleware // lets us dispatch() functions
  )
)

store.dispatch(selectSubreddit('reactjs'))

store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
)

store.dispatch(fetchPostsIfNeeded('reactjs')).then(() =>
  console.log(store.getState())
)

export default store