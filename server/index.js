const express = require('express');
const app = express();
const port = 3000;

let goatCount = 0;

app.get('/', (request, response) => {
  console.log('request.data:', request?.data);
  console.log('request.url:', request?.url);
  goatCount++;
  response.send(`Hello World! This page has been visited by ${goatCount} users.`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});