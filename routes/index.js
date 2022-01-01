const express = require('express');
const router = express.Router();

const feedbackRouter = require('./feedback');
const speakersRouter = require('./speakers');

/* Method 1 of doing this : 
router.get('/', (request, response) => {
  response.render('pages/index', { pageTitle: 'Welcome' });
});

module.exports = router;
*/

/* Method 2 of doing this (RECOMMENDED) */
/* Adding business logic : We received the instances of FeedbackService and SpeakerService classes as parameters from server.js file and we pass it on to feedbackRouter and speakersRouter  */
module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response) => {
    /* Note : this piece of code lets us check if the cookie-session module in our app is working or not. And is not intended to be a part of the application and hence commented out */
    /*
    if (!request.session.visitCount) {
      request.session.visitCount = 0;
    }
    request.session.visitCount += 1;
    console.log(`Visit count : ${request.session.visitCount}`);
    */

    try {
      const topSpeakers = await speakerService.getList();
      response.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
      // Note we didn't write layout/index because just writing layout defaults to layout/index
    } catch (err) {
      return next(err);
    }
  });

  router.use('/feedback', feedbackRouter(params));
  router.use('/speakers', speakersRouter(params));

  return router;
};
/* Through this approach we can pass arguments from our app to the routes as function parameters */
