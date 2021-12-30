// We want to learn more about template variables
const express = require('express');
const path = require('path');

const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService.js');
const SpeakerService = require('./services/SpeakerService.js');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();
const port = 3000;

const routes = require('./routes');

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
    console.log(response.locals);
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

app.use(
  '/',
  routes({
    feedbackService: feedbackService,
    speakerService: speakerService,
  })
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}!`);
});
