import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Notifications from 'react-notification-system-redux';

import RegisterComponent       from './Register.Component'
import { postRegisterForm } from '../../actions'

class Register extends Component {
	constructor(props) {
		super(props)

		this.formData = {}
	}

	handleRegister = () => {
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
			this.props.registerActions(data, (data) => {
				browserHistory.push('/')

				const notificationOpts = {
					title: 'Success',
					message: 'Register successful!',
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
			<RegisterComponent 
				handleRegister={ this.handleRegister }
				formData={ this.formData }
			/>
		)
	}
}

Register.propTypes = {
	user: PropTypes.object,
	dispatch: PropTypes.func
}

const mapStateToProps = (store, ownProps) => {
	return {
		userRegister: store.userRegister
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		registerActions: bindActionCreators(postRegisterForm, dispatch),
		dispatch: dispatch,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)