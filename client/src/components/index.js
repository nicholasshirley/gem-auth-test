// @flow

import React                    from 'react'
import PropTypes                from 'prop-types'
import { connect }              from 'react-redux'
import Notifications            from 'react-notification-system-redux'
import MuiThemeProvider         from 'material-ui/styles/MuiThemeProvider'

import { Header }               from './__layout/header'
import { Footer }               from './__layout/footer'

class App extends React.Component {
	render() {
		document.title = "DSB - Client" // Change Title or use Helmet extension
		return (
			<MuiThemeProvider>
				<div className="App">
					<Header />
					<div className="Content">
						{this.props.children}
					</div>
					<Footer />
					<Notifications
					  notifications={this.props.notifications}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

App.propTypes = {
  children: PropTypes.node,
  notifications: PropTypes.array
};

export default connect(state => ({ notifications: state.notifications }))(App)