const express = require('express');
const state = require('./persistence');


const app = express();
const port = 3000;


app.get('/', (request, response) => {
	console.log('incoming request', request.url);
	state.notes.push(request.url);
	response.json(state);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}.`);
});
