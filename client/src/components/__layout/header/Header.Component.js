// @flow

import React          from 'react'
import { Link }       from 'react-router'

export default class HeaderComponent extends React.Component {
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
						<Link to="/" className="navbar-brand">Dealsheet Board</Link>
					</div> 
					<nav className="collapse navbar-collapse" id="bs-navbar"> 
						<ul className="nav navbar-nav"> 
							<li className="active"><Link to="/notes" >Notes</Link></li> 
							<li><Link to="/about" >About</Link></li> 
							<li><Link to="/topics" >Topics</Link></li> 
							<li><Link to="/reddit" >Reddit</Link></li> 
							<li><Link to="/login" >Login</Link></li> 
							<li><Link to="/register" >Register</Link></li> 
						</ul> 
					</nav> 
				</div> 
			</header>
		)
	}
}