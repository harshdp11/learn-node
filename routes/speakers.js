const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;
  router.get('/', async (request, response) => {
    /* Since we don't have a webpage for speakers.js developed yet, we simply return a message for now */
    //return response.send('heres your speaker page');

    /* we intend to show data from speakers.json file using the speakerService.js file. The params are coming from server.js > index.js > speakers.js */
    // This is an sync function so I have to await it. And when I await a function, in another function i have to async it
    const speakers = await speakerService.getList();
    console.log(speakers);
    response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
  });

  // This handles the url speakers/<speakername> and display <speakername> on the page
  router.get('/:shortname', async (request, response) => {
    /* Here we handle routes after speakers e.g speakers/daniel and also send the shortname(e.g Daniel in this case) as a response on the webpage */
    // This line prints the url after speakers typed on the webpage. e.g speakers/Luca this prints message below and Luca
    //return response.send(`Details page of ${request.params.shortname}`);

    /* Note :  the getSpeaker function returns the info about a speaker. This method requests the shortname of the speaker as an argument. Refer to speakerService file for reference */
    try {
      const speaker = await speakerService.getSpeaker(request.params.shortname);
      const artworks = await speakerService.getArtworkForSpeaker(request.params.shortname);
      response.render('layout', { pageTitle: 'Speaker', template: 'speaker-details', speaker, artworks });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
