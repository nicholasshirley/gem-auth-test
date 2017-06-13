import React, { Component } from 'react'
import ReactDom             from 'react-dom'
import PropTypes            from 'prop-types'
import { 
	ControlLabel, 
	FormControl, 
	FormGroup, 
	HelpBlock 
}                           from '../../__libraries/react-bootstrap.lib'
import { getClassName }     from '../../__utilize'

export default class Input extends Component {
	constructor(props) {
		super(props)

		this.state = {
			dsbValidationState: null,
			xxx: 'yyy'
		}

		this.getValue = () => {
			if(this.validation()) {
				let tmp = {}
				tmp[this.props.dsbName] = this.value().replace(/,/g, '')
				return tmp
			}
			return false
		}

		this.setValue = (value) => {
			this.setManual(value)
		}
	}

	clearError = () => {
		this.setState({dsbValidationState: null})
	} 

	handleOnBlur = () => {
		this.validation()
		
		if (this.props.dsbOnBlur)
			this.props.dsbOnBlur()
	}

	handleOnFocus = () => {
		this.clearError()

		if (this.props.dsbOnFocus)
			this.props.dsbOnFocus()
	}

	handleOnChange = (e) => {
		if (this.props.dsbOnChange)
			this.props.dsbOnChange(this.getValue())

		return true
	}
	
	handleOnKeyUp = (e) => {
		if(this.props.dsbOnKeyUp)
			this.props.dsbOnKeyUp(e.keyCode)

		return true
	}
	
	handleEnter(event) {
		if(this.props.dsbOnEnter && event.charCode === 13) {
			this.props.dsbOnEnter()
		}
	}

	validation() {
		// value of input is any
		if(!this.props.dsdPattern) 
			return true

		let incorrect = !this.props.dsdPattern.test(this.value())
		if(incorrect) {
			this.setState({dsbValidationState: "error"})

			return false
		}

		return true
	}   

	value() {
		return ReactDom.findDOMNode(this.inputElem).value
	}

	setManual(value) {
		ReactDom.findDOMNode(this.inputElem).value = value
		
		this.clearError()
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.dsbDefaultValue !== undefined && this.props.dsbDefaultValue !== nextProps.dsbDefaultValue) {
			this.setManual(nextProps.dsbDefaultValue)
		}
	}

	componentDidMount(){
		let dom = ReactDom.findDOMNode(this.inputElem)

		dom.onkeypress = e => {
			let key = e.charCode

			if(this.props.dsbOnEnter && e.charCode === 13) {
				this.props.dsbOnEnter()
				return true
			}

			// Only allow number 0 - 9
			if(this.props.dsbNumber === 'N') 
				return (key >= 48 && key <=57)
			else if(this.props.dsbNumber === 'R') 
				return (key === 46 || (key >= 48 && key <=57))

			return true
		}

		if(this.props.dsbAutoFocus) dom.focus()        
	}

	render() {
		return (
			<FormGroup 
				controlId={ this.props.dsbId || null } 
				className={ `dsb_form form-group ${this.props.dsbClassControl || "" }` }
				validationState={ this.state.dsbValidationState || null }
			>
				<ControlLabel>
					{ this.props.dsbLabel || '' }
					{ this.props.dsbRequired ? <span className="dsb_form__required">*</span> : null }
				</ControlLabel>

				<FormControl
					type={ this.props.dsbType ? this.props.dsbType : "text" }
					placeholder={ this.props.dsbPlaceholder || "" }
					name={ this.props.dsbName }
					disabled={ this.props.dsbDisabled ? true : false }
					defaultValue={ this.props.dsbDefaultValue || null }
					inputRef={ ref => {this.inputElem = ref} }

					onBlur={ this.handleOnBlur }
					onFocus={ this.handleOnFocus }
					onChange={ this.handleOnChange }
					onKeyUp={ this.handleOnKeyUp }
				/>

				<HelpBlock className={getClassName({hidden: (this.state.dsbValidationState == null || this.state.dsbValidationState !== 'error')})}>{this.props.dsbValidationText }</HelpBlock>
			</FormGroup>
		)
	}
}

Input.propTypes = {
	dsbType: PropTypes.string,
	dsbPlaceholder: PropTypes.string,
	dsbValidationText: PropTypes.string,
	dsbName: PropTypes.string.isRequired,
	dsbDefaultValue: PropTypes.any,
	dsdPattern: PropTypes.object,
	dsbDisabled: PropTypes.bool,
	dsbAutoFocus: PropTypes.bool,
	dsbOnEnter: PropTypes.func,
	dsbOnKeyUp: PropTypes.func,
	dsbOnChange: PropTypes.func,
	dsbOnBlur: PropTypes.func,
	dsbOnFocus: PropTypes.func,
}