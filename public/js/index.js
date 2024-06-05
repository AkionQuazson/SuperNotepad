const noteForm = document.getElementById('new-note');
const noteInput = document.getElementById('note-input');
const notesList = document.querySelector('#notes-list');
let notesInHTML = document.querySelectorAll('.note');

noteForm.addEventListener('submit', (submitEvent) => {
	submitEvent.preventDefault();
	console.log('submitEvent:', submitEvent);
	const input = noteInput.value;
	console.log('input:', input);
})

notes = {
	she: 'asdf'
}

let note = document.createElement('div');
note.classList = 'note';
note.innerHTML = notes.she;
notesList.appendChild(note);
notesInHTML = document.querySelectorAll('.note');
