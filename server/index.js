const express = require('express');
const goatApp = express();
const goatPort = 3000;

let goatCount = 0;

goatApp.get('/', (request, response) => {
  console.log('goat request.data:', request?.data);
  console.log('goat request.url:', request?.url);
  goatCount++;
  response.send(`Hello World! This page has been visited by ${goatCount} goats.`);
});

goatApp.listen(goatPort, () => {
  console.log(`Example app listening on port ${goatPort}`)
});


const catApp = express();
const catPort = 9000;

let catCount = 0;

catApp.get('/', (request, response) => {
  console.log('cat request.data:', request?.data);
  console.log('cat request.url:', request?.url);
  catCount++;
  response.send(`Hello World! This page has been visited by ${catCount} cats.`);
});

catApp.listen(catPort, () => {
  console.log(`Example app listening on port ${catPort}`)
});