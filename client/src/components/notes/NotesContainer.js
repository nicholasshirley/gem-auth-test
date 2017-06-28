import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import NotesComponent from './NotesComponent'
import { getAllNotes } from '../../actions'

class NotesContainer extends React.Component {

	handleGetAllNotes = () => {
		this.props.GetNotesActions()
	}

	render() {
		return (
			<div className='notes__container'>
				<button className='btn btn-success' onClick={this.handleGetAllNotes}>Get All Notes</button>
				<NotesComponent notes={this.props.notes} />
			</div>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
	return {
		notes: store.notes
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		GetNotesActions: bindActionCreators(getAllNotes, dispatch),
		dispatch: dispatch,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer)
