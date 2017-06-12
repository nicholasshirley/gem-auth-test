// @flow

import React, { Component }   from 'react'
import { RelativeLink }       from 'react-router-relative-links'

export default class HeaderComponent extends Component {
	render() {
		return (
			<header className="bs-docs-nav navbar navbar-static-top" id="top"> 
				<div className="container"> 
					<div className="navbar-header"> 
						<button aria-controls="bs-navbar" aria-expanded="false" className="collapsed navbar-toggle" data-target="#bs-navbar" data-toggle="collapse" type="button"> 
							<span className="sr-only">Toggle navigation</span> 
							<span className="icon-bar"></span> 
							<span className="icon-bar"></span> 
							<span className="icon-bar"></span> 
						</button> 
						<RelativeLink to="./" className="navbar-brand">Dealsheet Board</RelativeLink>
					</div> 
					<nav className="collapse navbar-collapse" id="bs-navbar"> 
						<ul className="nav navbar-nav"> 
							<li className="active"><RelativeLink to="./notes" >Notes</RelativeLink></li> 
							<li><RelativeLink to="./about" >About</RelativeLink></li> 
							<li><RelativeLink to="./topics" >Topics</RelativeLink></li> 
							<li><RelativeLink to="./reddit" >Reddit</RelativeLink></li> 
							<li><RelativeLink to="./login" >Login</RelativeLink></li> 
							<li><RelativeLink to="./register" >Register</RelativeLink></li> 
						</ul> 
					</nav> 
				</div> 
			</header>
		)
	}
}