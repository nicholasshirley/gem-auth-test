import React from 'react';

const NotesComponent = ({notes}) => {
	console.log(notes)
	return (
		<ul className='notes'>
			{
				notes.length > 0 ? notes.map(function(note) {
					return (
						<li key={note.id}>{note.id} - {note.title}</li>
					)
				}) : null
			}
		</ul>
	);
}

export default NotesComponent
