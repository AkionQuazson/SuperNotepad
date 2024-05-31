const express = require('express');
const state = require('./persistence');

const app = express();
const port = 3000;

// for serving public directory at /
app.use(express.static('./public'));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get('/notes/', (request, response) => {
	console.log('incoming request', request.url);
	// state.notes.push(request.url);
	response.json(state.notes);
});
app.post('/notes/', (request, response) => {
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
