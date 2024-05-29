const express = require('express');
const dataPath = './.data/state.json';
const { readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const { Buffer } = require('node:buffer');

let state = {
  goatCount: 0,
  catCount: 0,
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
    lastSavedState = newString
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
    state = JSON.parse(contents);
  } catch (err) {
    console.error(`loadState error:, ${err.message}`);
    console.error(err);
    saveState();
  }
}
loadState()
  .then(() => {
    setInterval(saveState, 10000);
  })

const goatApp = express();
const goatPort = 3000;


goatApp.get('/', (request, response) => {
  console.log('goat request.data:', request?.data);
  console.log('goat request.url:', request?.url);
  state.goatCount++;
  response.send(`Hello World! This page has been visited by ${state.goatCount} goats.`);
});

goatApp.listen(goatPort, () => {
  console.log(`Example app listening on port ${goatPort}`)
});


const catApp = express();
const catPort = 9000;


catApp.get('/', (request, response) => {
  console.log('cat request.data:', request?.data);
  console.log('cat request.url:', request?.url);
  state.catCount++;
  response.send(`Hello World! This page has been visited by ${state.catCount} cats.`);
});

catApp.listen(catPort, () => {
  console.log(`Example app listening on port ${catPort}`)
});