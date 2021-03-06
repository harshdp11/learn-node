// We want to remove routes from the server and store them seperately in the routes folder.
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

/* Include the routes in our application. Also note that './routes' defaults to the index.js file so no need to specify that here*/
const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './provided/static')));

// Use the route to open '/' page
app.use('/', routes());

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}!`);
});
