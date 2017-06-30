import React                         from 'react'
import PropTypes                     from 'prop-types'
import { bindActionCreators }        from 'redux'
import { connect }                   from 'react-redux'
import { browserHistory }            from 'react-router'
import Notifications                 from 'react-notification-system-redux'
import TextField                     from 'material-ui/TextField'
import RaisedButton                  from 'material-ui/RaisedButton';

import { postRegisterForm }          from '../../actions'
import { getRegExp }                 from '../__utilize'

const RegisterComponent = ({handleRegister, formData, error}) => {
	return (
		<div className='auth__container register__container'>
			<h2>Register Page</h2>
			<div className="auth__form">
				<TextField
					className="input__group"
					errorText={error.email || null}
					floatingLabelText="Email"
					name="email"
					ref={ ref=>{formData.InputEmail = ref} }
				/>
				<TextField
					className="input__group"
					errorText={error.password || null}
					floatingLabelText="Password"
					type="password"
					name="password"
					ref={ ref=>{formData.InputPassword = ref} }
				/>
				<TextField
					className="input__group"
					errorText={error.password_confirmation || null}
					floatingLabelText="Password confirmation"
					type="password"
					name="password_confirmation"
					ref={ ref=>{formData.InputPasswordConfirmation = ref} }
				/>
				<TextField
					className="input__group hidden"
					floatingLabelText="Password confirmation"
					defaultValue="nil"
					type="hidden"
					name="confirm_success_url"
					ref={ ref=>{formData.InputConfirmSuccessUrl = ref} }
				/>
				<div className="button__group">
					<RaisedButton label="Register" primary={true} onClick={handleRegister} />
				</div>
			</div>
		</div>
	);
}


class Register extends React.Component {
	constructor(props) {
		super(props)

		this.formData = {}

		this.state = {
			error: {}
		}
	}

	handleRegister = () => {
		let countError = 0
		let data = {}

		for (let inputRef in this.formData) {
			let input = this.formData[inputRef].input

			switch(input.name) {
				case "email": 
					if (!getRegExp.typeEmail().test(input.value)){
						countError++
						this.setState((state) => { state.error[input.name] = "Email is invalid" })
					} else {
						this.setState((state) => { state.error[input.name] = null })
					}
					break
				
				case "password":
					if (!getRegExp.typeString(8).test(input.value)){
						countError++
						this.setState((state) => { state.error[input.name] = "Password is at least 8 characters" })
					} else {
						this.setState((state) => { state.error[input.name] = null })
					}
					break
				
				case "password_confirmation":
					if (input.value !== data.password){
						countError++
						this.setState((state) => { state.error[input.name] = "Password confirmation is not match" })
					} else {
						this.setState((state) => { state.error[input.name] = null })
					}
					break

				default:
					// do nothing
			}

			data[input.name] = input.value
		}

		if (countError === 0) {
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
				error={ this.state.error }
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