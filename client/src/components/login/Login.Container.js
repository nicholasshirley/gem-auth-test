import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux';

import LoginComponent       from './Login.Component'
import { postLoginForm } from '../../actions'

class Login extends Component {
	constructor(props) {
		super(props)

		this.formData = {}
	}

	handleLogin = () => {
		let validation = true
		let data = {}
		for (let inputRef in this.formData) {
			let inputValue = this.formData[inputRef].getValue()
			validation = validation && inputValue

			if (validation) {
				data = {
					...data,
					...inputValue
				}
			} else {
				console.log("Cannot get value of input.")
			}
		}

		if (validation) {
			this.props.LoginActions(data, (data) => {
				const notificationOpts = {
					title: 'Success',
					message: 'Login successful!',
					position: 'tr',
					autoDismiss: 5,
				};

				this.props.dispatch(Notifications.success(notificationOpts));
			}, (error) => {
				const notificationOpts = {
					title: 'Error',
					message: error.message,
					position: 'tr',
					autoDismiss: 5,
				};

				this.props.dispatch(Notifications.error(notificationOpts));
			})
		}
	}

	render() {
		return (
			<LoginComponent 
				handleLogin={ this.handleLogin }
				formData={ this.formData }
			/>
		)
	}
}

Login.propTypes = {
	user: PropTypes.object,
	dispatch: PropTypes.func
}

const mapStateToProps = (store, ownProps) => {
	return {
		userLogin: store.userLogin
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		LoginActions: bindActionCreators(postLoginForm, dispatch),
		dispatch: dispatch,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)