// We want to create a server and show a static message on an html page
const express = require('express');

const app = express();
const port = 3000;

/* Used boilder plate, installled express. Created a server and showed a static
message on localhost3000. run 'node server1.js in terminal' */
app.get('/', (request, response) => {
  response.send('hello exdcscpress');
});

// Tells the app to listen on the specified port
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}!`);
});
