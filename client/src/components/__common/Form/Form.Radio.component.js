'use strict'

import React        from 'react'

class FormRadio extends React.Component {
    constructor(props) {
        super(props)

        this.data = {}
        this.data[this.props.iwName] = null

        this.getValue = () => {
            for (var i = 0; i < this.props.children.length; i++) {
                let input = document.getElementById(this.props.children[i].props.iwId)
                if (input.checked) {
                    this.data[this.props.iwName] = this.props.children[i].props.iwValue
                    break
                } 
            }
            return this.data
        }
    }

    componentDidMount() {
        this.props.iwDefaultValue ? this.setValue() : null
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.iwDefaultValue != nextProps.iwDefaultValue) {
            this.setValue()
        }
    }

    setValue() {
        for (var i = 0; i < this.props.children.length; i++) {
            if (this.props.children[i].props.iwValue == this.props.iwDefaultValue) {
                let input = document.getElementById(this.props.children[i].props.iwId)
                input.checked = true
                break
            } 
        }
    }

    render() {
        return (
            <div 
                className={`formRadio ${this.props.iwClassControl || ""}`}
                name={ this.props.iwName }
            >
                {this.props.children}
            </div>
        )
    }
}

module.exports = FormRadio