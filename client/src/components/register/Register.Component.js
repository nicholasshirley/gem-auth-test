import React                from 'react'
import PropTypes            from 'prop-types'
import { Input }            from '../__common/Form'
import { getRegExp }        from '../__utilize'

export default class RegisterComponent extends React.PureComponent {
	render() {
		return (
			<div>
				<h2>Register Page</h2>
				<div className="register_form">
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
					<Input 
						dsbPlaceholder="Password confirmation" 
						dsbName="password_confirmation"
						dsbType="password"
						dsdPattern={ getRegExp.typeString(8) }
						dsbValidationText="Password confirmation not null and at least 8 characters."
						ref={ ref=>{ this.props.formData.InputPasswordConfirmation = ref} }
					/>
					<Input 
						dsbName="confirm_success_url"
						dsbType="hidden"
						dsbDefaultValue="nil"
						ref={ ref=>{ this.props.formData.InputConfirmSuccessUrl = ref} }
					/>
					<button onClick={ this.props.handleRegister } className="btn btn-primary">Register</button>
				</div>
			</div>
		);
	}
}

RegisterComponent.propTypes = {
	handleRegister: PropTypes.func.isRequired,
	formData: PropTypes.object.isRequired,
}