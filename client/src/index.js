// @flow

import './custom.css'
import './constants/global.constants'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import store from './configureStore'
import App from './components'
import About from './components/about'
import Topics from './components/topics'
import Notes from './components/notes'
import { Reddit } from './components/reddit'
import { Login } from './components/auth'
import { Register } from './components/auth'


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)


render((
  <Provider store={store}>
    <Router 
      history={history} 
    >
      <Route path="/" component={App}>
        <Route path="login" component={ Login }/>
        <Route path="register" component={ Register }/>
        <Route path="about" component={ About }/>
        <Route path="topics" component={ Topics }/>
        <Route path="notes" component={ Notes }/>
        <Route path="reddit" component={ Reddit }/>
      </Route>
    </Router>
  </Provider>
),document.getElementById('app'))
