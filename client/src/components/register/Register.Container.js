import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

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
				console.log("SuccessFull")
				browserHistory.push('/')
			}, (error) => {
				console.log(error.message)
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

function mapDispatchToProps(dispatch) {
	return {
		registerActions: bindActionCreators(postRegisterForm, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)