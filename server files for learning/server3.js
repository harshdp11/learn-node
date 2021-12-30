// We want to render a template file(index.ejs) and pass a variable(page title) from server to the template file.
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Letting the server know that we're using ejs for templating engine
app.set('view engine', 'ejs');
// Specifying the directory for our views(generated from template engine) to reside in. Create a folder names views manually
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './provided/static')));

/* Express will look into views > pages > index to find a mathcing template file and display it.
   Create a folder named pages manually and bring the index.html file from static folder and paste it here. 
   Rename the file to index.ejs.
   We're also passing a local variable called pageTitle
*/
app.get('/', (request, response) => {
  response.render('pages/index', { pageTitle: 'Welcome' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}!`);
});
