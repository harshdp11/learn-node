// We want to add business logic i,e read and write json data
const express = require('express');
const path = require('path');

// Note : since the name of class starts in capital letters
const FeedbackService = require('../services/FeedbackService.js');
const SpeakerService = require('../services/SpeakerService.js');

/* Note : this is an instance of a class so the name starts in lowercase and if you look into FeedbackService.js, you will find that the constructor expects a data file hence we pass the json data file in the contructor */
const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();
const port = 3000;

/* Include the routes in our application. Also note that './routes' defaults to the index.js file so no need to specify that here*/
const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './provided/static')));

// Use the route to open '/' page
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
