'use strict'

import React from 'react'
import ReactDom from 'react-dom'

import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'components/libraries/react-bootstrap.lib'
import { getClassName } from 'constants/index'

import uuid from 'uuid'

class FormSelect extends React.Component {
    constructor(props) {
        super(props)

        this.getValue = ()=>{
            let data = {}
            data[this.props.iwName] = this.state.value
            return this.state.value == undefined ? false : data
        }

        this.state = { value: '' }
    }

    componentWillMount() {
        if (this.props.iwDefaultValue || this.props.iwData)
            this.setState({value: this.props.iwDefaultValue ? this.props.iwDefaultValue : Object.keys(this.props.iwData)[0]})
    }

    componentWillReceiveProps(nextProps) {
        if ( (JSON.stringify(nextProps) !== JSON.stringify(this.props)) ) {
            this.setState({value: this.props.iwDefaultValue ? this.props.iwDefaultValue : Object.keys(nextProps.iwData)[0]})
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ( (JSON.stringify(nextProps) === JSON.stringify(this.props))
            && (JSON.stringify(nextState) === JSON.stringify(this.state)) ) {
            return false
        }
        return true
    }

    clearError = () => {
        if(this.props.iwClearError){
            this.props.iwClearError(null)
        }
    }
    
    change = (e) => {
        this.setState({value: e.target.value}, () => this.props.onChange ? this.props.onChange(this.getValue()[this.props.iwName]) : null)
    }

    renderOptions() {
        let options = []
        if (this.props.iwData) {
            options = Object.keys(this.props.iwData).map(key => {
                return <option key={uuid()} value={key}>{ this.props.iwData[key] }</option>
            })
        }

        return options
    }

    render() {
        return (
            <FormGroup 
                controlId={ this.props.iwId } 
                className={`commonFormGroup ${this.props.iwClassControl || ""} `}
                validationState={this.props.iwError || null }
            >
                <ControlLabel>{ this.props.iwLabel || "" }
                    {this.props.iwNotRequire || <span className="required">*</span>}
                </ControlLabel>
                
                <FormControl
                    componentClass = "select"
                    placeholder    = { this.props.iwPlaceholder || "" }
                    inputRef       = { ref=>{ this.inputSelected = ref } }
                    onFocus        = { this.clearError }
                    onChange       = { this.change }
                    value          = { this.state.value }
                    disabled       = { this.props.iwDisabled }
                >
                    { this.renderOptions() }
                </FormControl>
                <HelpBlock 
                    className={getClassName({hidden: this.props.iwError !== 'error'})}>
                    {this.props.iwErrorText }
                </HelpBlock>

            </FormGroup>
        )
    }
}

module.exports = FormSelect