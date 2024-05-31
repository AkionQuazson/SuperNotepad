const dataPath = './.data/state.json';
const { readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const { Buffer } = require('node:buffer');

const state = {
	notes: [],
};
let lastSavedState = '';

async function saveState() {
	try {
		const newString = JSON.stringify(state);
		if (newString === lastSavedState) {
			console.log('savestate already there');
			return;
		}
		const data = new Uint8Array(Buffer.from(newString));
		const promise = writeFile(dataPath, data);

		await promise;
		console.log('wrote state:', newString);
		lastSavedState = newString;
	} catch (err) {
		console.error(`saveState error:, ${err.message}`);
		console.error(err);
	}
}


async function loadState() {
	try {
		const filePath = resolve(dataPath);
		const contents = await readFile(filePath, { encoding: 'utf8' });
		console.log('loadState contents:', contents);
		Object.assign(state, JSON.parse(contents));
	} catch (err) {
		console.error(`loadState error:, ${err.message}`);
		console.error(err);
		saveState();
	}
}

loadState().then(() => {
	setInterval(saveState, 10000);
});

module.exports = state;
