// We want to render an existing html page instead of showing a static message.
const express = require('express');

const app = express();
const port = 3000;

// Include path module in our application. To learn more : https://www.w3schools.com/nodejs/ref_path.asp
const path = require('path');

/* Note that this is a middleware. Everytime you see app.use just know that
this is how middlewares are applied in express. This instructs express to look into
folder named static and for each request it receives and if it finds a matching file
it will send it to the browser. Note that if you dont use this then the html file still
loads but without images and css which is present in static folder */
app.use(express.static(path.join(__dirname, './provided/static')));

/* here we are creating a url for the html file. __dirname returns the root directory and
we join that to the path of the file to be displayed.  Also notice we use response.sendFile.
Previously we used response.send when we wanted to show static message. */
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, './provided/static/index.html'));
});
// Also note we can show pages with more urls like /speakers
app.get('/speakers', (request, response) => {
  response.sendFile(path.join(__dirname, './provided/static/speakers.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}!`);
});

/* We also insatlled developer dependencies and made a bunch of updates on vscode settings.
Refer to Readme file */
