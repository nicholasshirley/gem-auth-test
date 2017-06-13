import React, { Component } from 'react'
import { Input }            from '../__common/Form'
import { getRegExp }        from '../__utilize'

export default class RegisterComponent extends Component {
	constructor(props) {
		super(props)
	}
	
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
					/>
					<Input 
						dsbPlaceholder="Password" 
						dsbName="password"
						dsbType="password"
						dsdPattern={ getRegExp.typeString(8) }
						dsbValidationText="Password not null and at least 8 characters."
					/>
					<Input 
						dsbPlaceholder="Password confirmation" 
						dsbName="password_confirmation"
						dsbType="password"
						dsdPattern={ getRegExp.typeString(8) }
						dsbValidationText="Password confirmation not null and at least 8 characters."
					/>
					<button className="btn btn-primary">Register</button>
				</div>
			</div>
		);
	}
}