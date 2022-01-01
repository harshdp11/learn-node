const express = require('express');
const router = express.Router();

//Including express validator to validate user inputs
const { check, validationResult } = require('express-validator'); // destructing assignment
module.exports = (params) => {
  const { feedbackService } = params; // this way of assigning is called destructuring assignment
  router.get('/', async (request, response, next) => {
    /* Since we don't have a webpage for speakers.js developed yet, we simply return a message for now */
    // return response.send('heres your feedback page');
    // Refer to speakers.js for info on what changes have been made

    // We want to display the feedback template and show the existing list of feedbacks
    try {
      // Get the list of existing feedback from json file
      const feedbacks = await feedbackService.getList();

      // assign variable false if no error and error object if there's an error
      const errors = request.session.feedbacks ? request.session.feedbacks.errors : false;

      // assign variable false if no success and success message if there's an error
      const success = request.session.feedbacks ? request.session.feedbacks.successMessage : false;

      request.session.feedbacks = {};
      //After updating errors we want to reset this object so that when page is reloaded the errors go away

      console.log('error obj is: ', errors);
      console.log('success obj is: ', success);
      response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedbacks,
        errors /* passing the errors from form input to the template*/,
        success /*passing success message on correct form submission*/,
      });
    } catch (err) {
      return next(err);
    }
  });

  /* Here we handle the route after user submits the feedback form */
  router.post(
    '/',
    [
      // entered input goes through all the checks and
      check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
      check('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('A message is required'),
    ],
    async (request, response, next) => {
      try {
        /* Here we handle what happens when the user submits the form */

        // here we can check if there were any errors
        const errors = validationResult(request); // get all the errors from express-validator

        // now we handle the case where there were errors. checking if there are any errors
        if (!errors.isEmpty()) {
          // if there are errors store them in an object
          request.session.feedbacks = {
            // storing array of errors from validationResult
            errors: errors.array(),
          };
          return response.redirect('/feedback');
        }

        // Now we want to write the user inputs into feedback.json through feedbackService file
        const { name, email, title, message } = request.body; // get the user inputs into variables
        await feedbackService.addEntry(name, email, title, message); // write user inputs into files

        // Show a success message on form submission
        request.session.feedbacks = {
          successMessage: 'Thanks for your feedback',
        };

        /* we want to display the feedback page again. because we want to avoid users to reload the page and send the same input  */

        /*NOTE : In case of an error we store the error in an array and redirect to feedback route. Also if there were errors we need to show that on the page. So we pass the errors to the router.get middleware*/

        // the input from the form can be accessed using the body parser middleware in request.body object
        //console.log(request.body);
        return response.redirect('/feedback');
      } catch (err) {
        return next(err);
      }
    }
  );

  router.post(
    '/api',
    [
      // entered input goes through all the checks and
      check('name').trim().isLength({ min: 3 }).escape().withMessage('A name is required'),
      check('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('A title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('A message is required'),
    ],
    async (request, response, next) => {
      try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.json({ errors: errors.array() });
        }
        const { name, email, title, message } = request.body; // get the user inputs into variables
        await feedbackService.addEntry(name, email, title, message);
        const feedbacks = await feedbackService.getList();
        return response.json({ feedbacks });
      } catch (err) {
        return next(err);
      }
    }
  );
  return router;
};
