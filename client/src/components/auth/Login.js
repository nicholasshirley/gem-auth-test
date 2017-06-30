import React                         from 'react'
import PropTypes                     from 'prop-types'
import { bindActionCreators }        from 'redux'
import { connect }                   from 'react-redux'
import Notifications                 from 'react-notification-system-redux'
import TextField                     from 'material-ui/TextField'
import RaisedButton                  from 'material-ui/RaisedButton';

import { postLoginForm }             from '../../actions'
import { getRegExp }                 from '../__utilize'

const LoginComponent = ({handleLogin, formData, error}) => {
	return (
		<div className='auth__container login__container'>
			<h2>Login Page</h2>
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
				<div className="button__group">
					<RaisedButton label="Login" primary={true} onClick={handleLogin} />
				</div>
			</div>
		</div>
	);
}


class Login extends React.Component {
	constructor(props) {
		super(props)

		this.formData = {}

		this.state = {
			error: {}
		}
	}

	handleLogin = () => {
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

				default:
					// do nothing
			}

			data[input.name] = input.value
		}

		if (countError === 0) {
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
				error={ this.state.error }
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