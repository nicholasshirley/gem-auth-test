import React, { Component } from 'react'
import logo from '../styles/images/logos/logo.svg'
import { RelativeLink } from 'react-router-relative-links'

class App extends Component {
  render() {
    document.title = "DSB - Client" // Change Title or use Helmet extension
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="text-success">DSB-{ process.env.NODE_ENV } - { process.env.REACT_APP_SECRET_CODE }</h2>
        </div>

        <p className="App-intro">
          <RelativeLink to="./about" >About</RelativeLink>
          <span>*</span>
          <RelativeLink to="./topics" >Topics</RelativeLink>
          <span>*</span>
          <RelativeLink to="./reddit" >Reddit</RelativeLink>
        </p>
        {this.props.children}
      </div>
    );
  }
}

export default App