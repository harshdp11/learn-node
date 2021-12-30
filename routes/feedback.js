const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response) => {
    /* Since we don't have a webpage for speakers.js developed yet, we simply return a message for now */
    // return response.send('heres your feedback page');
    // Refer to speakers.js for info on what changes have been made

    const feedback = await feedbackService.getList();
    return response.json(feedback);
  });

  /* Here we handle the route after user submits the feedback form */
  router.post('/', (request, response) => {
    /* Here we handle routes after speakers e.g speakers/daniel and also send the shortname(e.g Daniel in this case) as a response on the webpage */
    return response.send('feedback form posted');
  });

  return router;
};
