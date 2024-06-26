const express = require('express');
const state = require('./persistence');

const app = express();
const port = 3000;

// for serving public directory at /
app.use(express.static('./public'));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// for parsing application/json message bodies
app.use(express.json());

const catHeaderMiddleware = (request, response, next) => {
	if ((request.body.note || '').toLocaleLowerCase().includes('goat')) {
		response.status(400).json({
			error:'goats have been banned from the server for some reason'
		})
		return;
	}
	response.set({
		'cat-loved': true,
	});
	next();
}
app.get('/notes/', [catHeaderMiddleware], (request, response) => {
	console.log('incoming request', request.url);
	// state.notes.push(request.url);
	response.json(state.notes);
});
app.get('/notes/:id', [catHeaderMiddleware], (request, response) => {
	console.log('incoming request', request.url);
	// state.notes.push(request.url);
	const id = parseInt(request.params.id, 10);
	const record = state.notes[id];
	if (record === undefined) {
		response.status(404).json({error:'note does not exist'});
		return;
	}
	response.json(record);
});
app.post('/notes/', [catHeaderMiddleware], (request, response) => {//commonly abbreviated to req and res
	console.log('request.body', request.body);
	let note = request.body?.note.trim() || '';
	if (!note) {
		response.status(400).json({error:'note must not be empty'});
		return;
	}
	state.notes.push(note);
	response.json(state.notes);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}.`);
});
