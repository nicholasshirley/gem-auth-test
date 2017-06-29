// @flow

import React, { Component }   from 'react'
import logo                     from '../../../styles/assets/imgs/logos/logo.svg'

export default class FooterComponent extends Component {
	render() {
		return (
			<footer>
				<div className="App-footer">
					<img src={logo} className="App-logo" alt="logo" />
					<h3 className="text-success">DSB-{ process.env.NODE_ENV } - { process.env.REACT_APP_SECRET_CODE }</h3>
				</div>
			</footer>
		)
	}
}
