'use strict'

import React from 'react'
import ReactDom from 'react-dom'

class FormCheckRadio extends React.Component {
    componentDidMount(){
        if(this.props.iwAutoFocus){
            let dom = ReactDom.findDOMNode(this.inputValue)
            dom.click()
        } 
    }

    render() {
        return (
            <label className={`iwCheckboxOutline ${this.props.iwClassControl || ""}`}>
                <input 
                    type="radio"
                    id={ this.props.iwId } 
                    name={ this.props.iwName }
                    value={ this.props.iwValue }
                    ref={ref =>{this.inputValue = ref}}
                    onChange={this.props.iwOnChange}
                /> { this.props.iwLabel || "" }
                <span></span>
            </label>
        )
    }
}

module.exports = FormCheckRadio