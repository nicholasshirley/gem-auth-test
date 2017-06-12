// @flow

import React, { Component }     from 'react'
// import { RelativeLink }         from 'react-router-relative-links'
import { Header }               from './__layout/header'
import { Footer }               from './__layout/footer'

class App extends Component {
	render() {
		document.title = "DSB - Client" // Change Title or use Helmet extension
		return (
			<div className="App">
				<Header />
				<div className="Content">
					{this.props.children}
				</div>
				<Footer />
			</div>
		);
	}
}

export default App