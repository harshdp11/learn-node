// We want to create error pages when a route is not found
const express = require('express');
const path = require('path');
// include body parser module
const bodyParser = require('body-parser');

const createError = require('http-errors');

const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService.js');
const SpeakerService = require('./services/SpeakerService.js');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();
const port = 3000;

const routes = require('./routes');
const { request, response } = require('express');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './provided/static')));

/* This is a way of declaring global variables that are present from the start of server and across entire lifecycle*/
/* As a way to test we add this variable to the pageTitle in layout > index.ejs */
app.locals.siteName = 'ROUX meetups';

// One way of declaring global template variables is through middleware
app.use(async (request, response, next) => {
  /* Variable is set on sub property of response object called locals. Variable 'someVariableName' is accessible to all templates */
  /*response.locals.someVariableName = 'hello';
  return next(); */

  /*Here we try to read data from speakers json file and pass them to template as a variable*/
  /* We're basically trying to read list of speakers(name and their page link) from json file and show them in speakers dropdown in navigation. Refer to navigation.ejs in views  */
  try {
    const names = await speakerService.getNames();
    // to make it available as a global variable :
    response.locals.speakerNames = names;
    //console.log(response.locals);
    next();
  } catch (err) {
    return next(err);
  }
});

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['bjbjfbvjdfbvjdf', 'jhvfjh7yidfbvd'],
  })
);

// Run the body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  '/',
  routes({
    feedbackService: feedbackService,
    speakerService: speakerService,
  })
);

// Using the http-errors module to create an error
app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});
// This is an error handling middleware. A middleware that takes 4 arguments is an error handling middleware
app.use((err, request, response, next) => {
  /* The response.locals property is an object that contains response local variables scoped to the request and because of this, it is only available to the view(s) rendered during that request/response cycle (if any) */
  console.error(err); // give entire info about the error in console.
  response.locals.message = err.message;
  const status = err.status || 500; // 500 is the default internal server error status acc. to http standard
  response.locals.status = status;
  response.status(status);
  // rendering the error.ejs file
  response.render('error');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}!`);
});
