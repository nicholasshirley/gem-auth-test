'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import { getClassName } from 'constants/index'
import { FormGroup} from 'components/libraries/react-bootstrap.lib'
import { Dropdown } from 'components/libraries/react-office-fabric.lib'

class IwSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            key: null
        }

        this.getValue = ()=>{
            let tmp = {}
            tmp[this.props.iwName] = this.state.key
            //{name: key}
            return tmp
        }
    }
    onChange(item){
        this.setState(()=>{
            this.state.key = item.key
            return this.state
        })
        
        if(this.props.onChange) this.props.onChange(item.key)
    }
    componentWillMount(){
        if(this.props.iwDedault){
            this.setState(()=>{
                this.state.key = this.props.iwDefault
                return this.state
            })
        }else{
             this.setState(()=>{
                this.state.key = 1
                return this.state
            })
        }
    }

    componentDidMount(){
        if(this.props.inputRef){
            this.props.inputRef(this.selected)
        }
    }

    componentWillReceiveProps(nextProp){
        let state = {
            options:  Object.keys(nextProp.iwData).map(key=>{return { key: parseInt(key), text: nextProp.iwData[key]}})
        }

        this.select.state.selectedIndex = this.state.key-1

        this.setState(state)
    }

    render() {
        return (
            <FormGroup 
                controlId={ this.props.iwId } 
                className={`commonFormGroup ${this.props.iwClassControl || ""} `}
            >
                <Dropdown
                    label={this.props.iwLabel}
                    options={ this.state.options }
                    onChanged={ item => this.onChange(item)}
                    ref={ref => {this.select = ref}}
                />
            </FormGroup>
        )
    }
}

module.exports = IwSelect