const noteForm = document.getElementById('new-note');
const noteInput = document.getElementById('note-input');
const notesList = document.querySelector('#notes-list');

noteForm.addEventListener('submit', (submitEvent) => {
	submitEvent.preventDefault();
	console.log('submitEvent:', submitEvent);
	const input = noteInput.value;
	console.log('input:', input);
	fetch('/notes/', {
		method:'post',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({note:input}),
	})
	.then((response) => { return response.json() })
	.then((data) => {
		console.log('data in eventListener', data);
		if (!data.error) {
			renderNotes(data);
		}
	})
})


const renderNotes = (notes) => {
	notesList.innerHTML = '';
	if (notes?.length > 0) {
		notes.forEach((note) => {
			let listItem = document.createElement('li');
			listItem.classList.add('note');
			listItem.innerText = note;
			notesList.appendChild(listItem);
		});
	}
}
const loadNotes = () => {
	fetch('/notes/')
		.then((response) => {
			console.log('loadNotes: what is response?',response)
			return response.json();
		})
		.then((notes) => {
			renderNotes(notes);
		})
}
loadNotes();
