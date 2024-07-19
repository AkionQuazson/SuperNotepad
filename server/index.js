const express = require('express');
const state = require('./persistence');
const passport = require('passport');
const authRouter = require('./auth');
const session = require('express-session');

const SQLiteStore = require('connect-sqlite3')(session);


const app = express();
const port = 3000;

// for serving public directory at /
app.use(express.static('./public'));

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	store: new SQLiteStore({ db: 'authsession.sqlite', dir: './.data/db' })
}));
app.use(passport.authenticate('session'));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// for parsing application/json message bodies
app.use(express.json());

app.use('/', authRouter);

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

const logMiddleware = (request, response, next) => {
	console.log('what is session',request.session);
	next();
};

app.use(logMiddleware);

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
