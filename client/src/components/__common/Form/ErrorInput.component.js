'use strict'

import React from 'react'
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'components/libraries/react-bootstrap.lib'
import { getClassName } from 'constants/index'

class InputError extends React.Component {

    render() {
        return (
            <span className={ getClassName({"hidden": !this.props.iwError }, "col-sm-12 text-danger")}>
                            { this.props.iwErrorText }
            </span>
        )
    }

}

module.exports = InputError
