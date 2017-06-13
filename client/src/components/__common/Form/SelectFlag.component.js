'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import { getClassName } from 'constants/index'
import { FormGroup, ControlLabel} from 'components/libraries/react-bootstrap.lib'

import { Dropdown } from 'components/libraries/react-office-fabric.lib'

class SelectFlag extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			options: [],
			key: null,
			flag: ''
		}
		this.getValue = () => {
			let data = {}
			data[this.props.iwName] = this.state.key
			return data
		}
	}

	onChange(item){
		debug("Item Selected: ", item)
		this.setState(()=>{
			this.state.key = item.key
			this.state.flag = '/app/assets/images/flags/' + item.flag + '.svg'
			return this.state
		})

		if(this.props.iwOnChange) this.props.iwOnChange(item.key)
	}

	initOptions(props){
		if(Object.keys(props.iwData).length){
			let options = Object.keys(props.iwData).map(key=>{ return { key: parseInt(key), text: props.iwData[key].name, flag: props.iwData[key].flag} })
			let keyItemSelected = props.iwDefaultValue ? props.iwDefaultValue : 28 // 28 is key of USD

			this.setState(()=>{
				this.state.options = options
				this.state.key = keyItemSelected 
				this.state.flag = '/app/assets/images/flags/' + props.iwData[keyItemSelected].flag + '.svg'
				return this.state
			})			
		}
	}

	componentWillMount(){
		this.initOptions(this.props)
	}

	componentWillReceiveProps(nextProps){
		let nextPropsLength = Object.keys(nextProps.iwData).length
		let prevPropsLength = Object.keys(this.props.iwData).length

		if(prevPropsLength != nextPropsLength){
			this.initOptions(nextProps)
		}
	}

	onRenderOption(item) {
		if(this.props.iwOnRenderOption) {
			this.props.iwOnRenderOption(item)
		} else {
			return (
				<span className="select-flag">
					<img src={'/app/assets/images/flags/' + item.flag + '.svg'} alt=""/>
					{item.text}
				</span>
			)
		}
	}

	render() {
		return (
			<FormGroup 
				className={`commonFormGroup formSelectFlag ${this.props.iwClassControl || ""} `}
			>
				<ControlLabel>{ this.props.iwLabel || "" }
					{this.props.iwNotRequire || <span className="required">*</span>}
				</ControlLabel>
				<img className="currency_flag" src={ this.state.flag } alt=""/>
				<Dropdown
					selectedKey={this.state.key}
					options={ this.state.options }
					onChanged={ item => this.onChange(item)}
					ref={ref => {this.select = ref}}
					onRenderOption = {item => this.onRenderOption(item)}
				/>
			</FormGroup>
		)
	}
}

module.exports = SelectFlag