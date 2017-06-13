'use strict'

import React                     from 'react'
import ReactDom                  from 'react-dom'
import { getClassName }          from 'constants/index'
import { 
	ControlLabel, 
	FormControl, 
	FormGroup, 
	HelpBlock 
} from 'components/libraries/react-bootstrap.lib'

class FormTextarea extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			iwValidationState: null,
		}
		this.getValue = ()=> {
			if (this.validation()) {
				let data = {}
				data[this.props.iwName] = this.value()
				return data
			}
			return false
		}
		this.setValue = (value) => {
			debug(value)
			this.setManual(value)
		}
	}

    componentWillReceiveProps(nextProps) {
        if (this.props.iwDefaultValue != undefined) {
            if (this.props.iwDefaultValue != nextProps.iwDefaultValue) {
                this.setManual(nextProps.iwDefaultValue)
            }
        }
    }

	componentDidMount(){
		let elem = ReactDom.findDOMNode(this.textareaRef)
		elem.onkeypress = e => {
			let key = e.charCode
			if(this.props.iwOnEnter && e.charCode == 13) {
				this.props.iwOnEnter()
			}
			return true
		}

		if(this.props.iwAutoFocus) elem.focus()        
	}

	value() {
		return ReactDom.findDOMNode(this.textareaRef).value
	}

	validation() {
		let check = this.props.iwParttern
		if (!check) return true
		let incorrect = !check.test(this.value().replace(/(\r\n|\n|\r)/gm,""))
		if(check && incorrect) {
			this.setState(()=> {
				this.state.iwValidationState = 'error'
				return this.state
			})
			return false
		} 
		return true
	}

	clearError = () => {
		this.setState(() => {
			this.state.iwValidationState = null
			return this.state
		})
	}

	handleBlur = () => {
		this.validation()
		return true
	}

	handlerEnter(e) {
		if (this.props.iwOnEnter && e.charCode == 13) {
			this.props.iwOnEnter()
		}
	}

	setManual(value) {
		if (value != undefined) {
			ReactDom.findDOMNode(this.textareaRef).value = value
		} else {
			ReactDom.findDOMNode(this.textareaRef).value = ''
		}
		this.clearError()
	}

	render() {
		return (
			<FormGroup 
				controlId={ this.props.iwId || "" } 
				className={`commonFormGroup textareaContainer ${this.props.iwClassControl || "" }`}
				validationState={this.state.iwValidationState || null }
			>
				<ControlLabel>
					{ this.props.iwLabel || '' }
					{this.props.iwNotRequire || <span className="required">*</span>}
				</ControlLabel>
				<FormControl
					componentClass="textarea"
					placeholder={ this.props.iwPlaceholder || "" }
					name={ this.props.iwName || "" }
					inputRef={ref=>{this.textareaRef = ref}}
					onBlur={this.handleBlur}
					onFocus={ this.clearError }
					defaultValue={this.props.iwDefaultValue || ''}
					disabled={this.props.iwDisabled ? true : false}
				/>
				<HelpBlock className={getClassName({hidden: (this.state.iwValidationState == null || this.state.iwValidationState !== 'error')})}>
					{this.props.iwValidationText }
				</HelpBlock>
			</FormGroup>
		)
	}

}

module.exports = FormTextarea