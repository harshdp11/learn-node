// We want to add cookie-session middleware
const express = require('express');
const path = require('path');

// Include cookie-session into our application
const cookieSession = require('cookie-session');

const FeedbackService = require('../services/FeedbackService.js');
const SpeakerService = require('../services/SpeakerService.js');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();
const port = 3000;

const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './provided/static')));

// This makes express trust cookies that are passed through a reverse proxy. Without this our cookie-session won't work
app.set('trust proxy', 1);

// Adding cookie-session middleware to request lifecycle
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
