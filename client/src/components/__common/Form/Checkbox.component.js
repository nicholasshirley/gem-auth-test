'use strict'

import React    from 'react'
import ReactDom from 'react-dom'

class FormCheckbox extends React.Component {
    constructor(props){
        super(props)
        this.getValue = ()=>{
            let tmp = {}
            let dom = ReactDom.findDOMNode(this.inputValue)
            if(dom.checked){
                tmp[this.props.iwName] = 1
            }else{
                tmp[this.props.iwName] = 0
            }
            return tmp
        }

        this.state = {
            checked: false
        }
    }
    
    componentWillMount(){
        if(this.props.iwDefaultValue != 0){
           this.setState(()=>{
                this.state.checked = true
                return this.state
            }) 
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.iwDefaultValue != undefined) {
            if (this.props.iwDefaultValue != nextProps.iwDefaultValue) {
                if(nextProps.iwDefaultValue != 0){
                    this.setState(()=>{
                        this.state.checked = true
                        return this.state
                    }) 
                }
            }
        }
    }

    changeCheckbox = (event) => {
        this.setState(()=>{
            this.state.checked = !this.state.checked
            return this.state
        })
        let tmp = {}
        tmp[this.props.iwName] = event.target.checked
        if(this.props.iwCB) this.props.iwCB(tmp)
    }

    render() {
        return (
            <label className={`iwCheckboxOutline ${this.props.iwClassControl || "" }`}>
                <input 
                    type="checkbox"
                    id={ this.props.iwId } 
                    name={ this.props.iwName || "" }
                    onChange={this.changeCheckbox}
                    ref={ref=>{this.inputValue = ref}}
                    checked={this.state.checked}
                /> { this.props.iwLabel }
                <span></span>
            </label>
        )
    }
}

module.exports = FormCheckbox