import React                from 'react'
import PropTypes            from 'prop-types'
import { Input }            from '../__common/Form'
import { getRegExp }        from '../__utilize'

export default class LoginComponent extends React.Component {
	render() {
		return (
			<div className='auth__container login__container'>
				<h2>Login Page</h2>
				<div className="auth__form">
					<Input 
						dsbPlaceholder="Email" 
						dsbName="email"
						dsdPattern={ getRegExp.typeEmail() }
						dsbValidationText="Email not null and must right format."
						ref={ ref=>{ this.props.formData.InputEmail = ref} }
					/>
					<Input 
						dsbPlaceholder="Password" 
						dsbName="password"
						dsbType="password"
						dsdPattern={ getRegExp.typeString(8) }
						dsbValidationText="Password not null and at least 8 characters."
						ref={ ref=>{ this.props.formData.InputPassword = ref} }
					/>
					<button onClick={ this.props.handleLogin } className="btn btn-success">Login</button>
				</div>
			</div>
		);
	}
}

LoginComponent.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	formData: PropTypes.object.isRequired,
}