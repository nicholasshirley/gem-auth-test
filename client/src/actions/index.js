import fetch from 'isomorphic-fetch'
import request from '../helpers/request'


export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestPosts(subreddit))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receivePosts(subreddit, json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts(subreddit))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}


/*
|--------------------------------------------------
| ALl Actions
|--------------------------------------------------
*/
// =============================================== //
export const REGISTER = 'REGISTER'

function register(user) {
  return {
    type: REGISTER,
    data: user.data,
  }
}

export function postRegisterForm(dataForm, resolve = () => {}, reject = () => {}) {
  return (dispatch) => {
    request().post('/auth', dataForm)
    .then(function (response) {
      dispatch(register(response.data))

      resolve(response.data)
    })
    .catch(function (error) {
      console.warn(error);

      reject(error)
    });
  }
}

// =============================================== //
export const LOGIN = 'LOGIN'

function login(user) {
  return {
    type: LOGIN,
    data: user.data,
  }
}

export function postLoginForm(dataForm, resolve = () => {}, reject = () => {}) {
  return (dispatch) => {

    request().post('/auth/sign_in', dataForm)

    .then(function (response) {

      window.STORAGE.set('headers', {...response.headers})

      // Save info of user in localStorage
      window.STORAGE.set('user', {...response.data.data})

      dispatch(login(response.data))

      resolve(response.data)

    })

    .catch(function (error) {

      console.warn(error);

      reject(error)

    });

  }
}

// =============================================== //
export const GET_ALL_NOTES = 'GET_ALL_NOTES'

function getAllNotesReducer(notes) {
  return {
    type: GET_ALL_NOTES,
    data: notes,
  }
}

export function getAllNotes() {
  return (dispatch) => {

    request(window.STORAGE.get('headers')).get('/notes')

    .then(function (response) {
      
      console.log(response)

      window.STORAGE.set('headers', {...response.headers})

      dispatch(getAllNotesReducer(response.data))

    })

    .catch(function (error) {

      console.warn(error);

    });

  }
}