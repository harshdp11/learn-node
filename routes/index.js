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
module.exports = () => {
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/feedback', feedbackRouter());
  router.use('/speakers', speakersRouter());

  return router;
};
/* Through this approach we can pass arguments from our app to the routes as function parameters */
