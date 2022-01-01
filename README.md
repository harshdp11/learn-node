# Setting up a development environment

- Install node
- Create a folder and initialise it. Command : npm init. Select default settings. This creates a package.json file.
- Then we install express and it gets added as a dependency in our package.json file. Install : sudo npm install express
- After that, we will create a script in package.json that will start our web server when we run it with npm start: "start": "node server.js",
- Tools to install are :
  1. ES Lint : Install : sudo npm install -D eslint (While installing in terminal, -D is used to specify a developer dependency)// Initialise : npx eslint --init (npx comes with npm and it checks for a dependecy if it is not present in pulls it into the project)
     ~ To check syntax, find problems, and enforce code style
     ~ CommonJS (require/exports) -> module node that nodejs uses
     ~ React/Vue or None
     ~ Typescript : No
     ~ Node (not browser)
     ~ Select use popular style guide : Airbnb
     ~ config file in JSON
     ~ Additional dependencies : Yes
  2. Prettier : Install : sudo npm install -D prettier eslint-config-prettier eslint-plugin-prettier
     ~ We are installing two extra modules that integrate prettier with eslint and make sure that prettier is consistent with guidelines from eslint
     ~ VS Code is not aware that we have installed eslint and prettier. Hence we need to install plugins
     --> Install eslint plugin and prettier
     --> After installing go to code > preferences > settings > type eslint in searchbox and select autofix on save, type save and select 'editor:format on save', type formar and select prettier in default format dropdown
     --> Note : After installing eslint,prettier and plugins go to eslintrc.json file and add "prettier
     "extends": [
     "airbnb-base", "prettier"
     ],
     Also add a new plugins array as below :
     "plugins": ["prettier"]
     --> After this create a new file called .prettierrc, this file has some defaults for the prettier plugin like trailig comma for arrays in js, singlequote for strings etc.
  3. Nodemon : Inorder to avoid restarting server after making any change. Install : sudo npm install -D nodemon. The go to package.json and add "dev": "nodemon --ignore feedback.json server.js" in scripts object.
     "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
     "start": "server.js",
     "dev": "nodemon --ignore feedback.json server.js"
     },
     Then use command : npm run dev

# Template Engines (Refer to index.ejs in views folder and index.js in routes folder)

Help in creating html pages by putting together modular components. There are a number of available templating engines like pug, ejs etc. We will use ejs. link : https://ejs.co/
We need to install ejs in out project first by command : sudo npm install ejs
after installation, we need to tell our server file that we're using ejs. So, include app.set('view engine', 'ejs'); below the line where we define port.
Then we need to tell express where to find those views. To do this add line : app.set('views', path.join(\_\_dirname,'./views')); below the line added above. This means that our template will be present in a folder called views. So, also create a folder called views in the project.
Also install a vscode extension for ejs

# Middlewares

syntax : app.use(callback) or app.use(path,callback)
we also have routing middlewares which have an http verb(get, post etc) in them. syntax : app.[get / post / put / delete](path, callback).
middlewares can :

- execute any code
- change the request, response objects
- end the request/response cycle (mostly to send data back to the caller)
- call the next middleware in stack

parameter routes : Express routes can contain parameters. This means that part of the url can be dynamic and this dynamic url can then be used by the application

A middleware should always end the request or pass on the request to another middleware. Otherwise the request will hang.

# Routing Middlewares (Refer to js files in routes folder)

So far we've been defining all routes for our app directly in server file. This works for small apps but for bigger apps it can become hard and confusing. Good practise is to group all routes in a file or directory of its own.
So, we create a new folder called routes which has an index.js file. In here we define the rout for home index page.

Routing for subpages :

- Creating new .js files in routes folder for each subpage to be added in route. These files look similar to index.js file.
- Include subpage route files in index.js file
- Call the functions for these subpages in module.exports function in index.js by using app.use like this : app.use('/speakers',speakersRoute());
- We can also define routes for subpages within subpages e.g /speakers/Daniel using /:shortname. And we can also print the shortname typed by user in url into the webpage

# Adding business logic (reading and writing json files)

Instructor from Linkedin learning had already prepared classes that would help us in doing this. These files initially resided in provided > services folder. Also, provided > data contains data which we need to display/update. (Please understand how to do this on your own later).
Move these folders to root of the application.

Go to server file and include the service files. Then in app.use('/', routes()). Pass these instances of classes as arguments in routes callback.

Then in index.js function, send these params to feedback and speakers routing middlewares and modify code to display them on the webpage.

localhost:300/feedback and localhost:300/speakers should show json data.

# Session Management middleware

NOTE : HTTP is called as a stateless protocol because each request is executed independently, without any knowledge of the requests that were executed before it, which means once the transaction ends the connection between the browser and the server is also lost.

To persist date for a user from request to request we need sessions. We learn how to install a session management system and how to use it. There are various session modules but we will use cookie sessions. Cookie sessions store the data that we want to be persisted on the client in encrypted form.

Installation : sudo npm install cookie-session

Then include cookie session into the application by app.use(cookieSession()) and add app.set('trust proxy', 1) to make express trust the reverse proxy. Without this cookie-session won't work.

To check whether our cookie-session works we go to index.js in routes and print out the visit count in console.log. The count should increase on every reload. NOTE that this is the visit count of one specific user and not all users. To check this you can open localhost in incognito mode and the count printed would be 1.

Go to inspect > Network > Cookies

# Creating site-wise layouts

- Create a folder named layout in views folder
- Copy index.ejs file into layout
- Keep everything that is specific to the page (i,e remove all reusable components and only keep the specific one) in index.ejs in pages folder ( only <article> div was kept)
- In index.ejs in layout, remove the page specific content and only keep the reusable components (<article> was removed)
- Remove all relative paths i,e change './' to '/'. for example :change <script src="./js/pixgrid.js"></script> to <script src="/js/pixgrid.js"></script>. This is because the absolute path points to the root of our project when its delivered by express and it will work even work when we're on a subpage but the relative path won't point to the right location anymore
- Include pages>index in layout>index using include
- Change the template rendering function (i,e index.js) in routes by specifying the rout to layout(layout>index is the main file being rendered) and including template variable which has value index (pages>index which has page specific component and is called in layout > index)
- Note the component being included was sent from index.js in routes as a variable. But this could also have been done without it by directly mentioning the component files path. We did it through a variable to demonstrate that we can include components in a page dynamically as well.
-

# partials

- Reusable functional units
- Created a folder named partials in views
- Created a file navigation.ejs for navigation partial
- Include navigation.ejs in index
- Update('./index.html' -> '/', './speakers.html' -> '/speakers') all links in navigation.ejs
- Do same thing for scripts

# More about template variables

- As of now we we had defined variable directly in the template (e.g { pageTitle: 'Welcome', template: 'index' }).But there are more ways of doing it
- We can also define global variables which are accessible to all template (Refer to server.js)
  -> Through a middleware (in app.use and set a variable on sub property of response object called locals like this response.locals.someVariableName = 'hello';)
  -> Variables which are declared at the start of the server and are present across the whole lifecycle. Done via application object(e.g app.locals.siteName = 'ROUX meetups')
- We can also read data from files and pass them as variable into templates

# Looping through lists in template

- We loop through the list that we read from speakers.json and display it in speakers dropdown. Refer to navigation.ejs file in partials.
- We also want to do this to the list of speakers below the navigation.
  -> Create a partials file name topSpeakers in pages>partials
  -> In index.ejs in routes, we already have a list of speakers in params(passed from server.js)
  -> We get a list of all speakers and their info into a variable and pass it down to topSpeakers.ejs file and run a loop to display them all
- We also created localhost:3000/speakers page
  -> Move speakers.html to views > pages folder and rename it to speakers.ejs
  -> Remove the reusable components(header and scripts at the bottom) and only keep page specific components
  -> In speakers.js routes file, we return layout>index.js (since it already has all reusable components) and we pass page specific data(stored in speakers.ejs) as a template variable along with a list of all speakers and their data
  -> Dynamically created list of speakers using data from json file and passing it to speakers.js in files and from there to speakers.ejs as a variable.
- We also created localhost:3000/speakers/speaker-details page
  -> Move the speaker details template html to pages and rename it to speaker-details.ejs
  -> Remove reusable components from this page and only keep page specific html
  -> In speaker.js in routes, in the shortname block, add code(the getSpeaker function returns the info about a speaker. This method requests the shortname of the speaker as an argument. Refer to speakerService file for reference) which gets the speaker info and pass it on to the template as a variable.
- We also changed the artwork section (images appearing on the right) by converting it into a partial and dynamically fetching the images from json file by using getArtworkForSpeaker() function from SpeakerService function.

# Handling errors in express

- Important concepta to know for error handling in javascript :
  -> try{} : Let you test a block of code for errors
  -> catch(err){} : Lets you handle the error
  -> throw{} : Lets you create custom errors
  -> finally{} : Lets you execute code after try and catch regardles of the result
  Tutorial : https://www.youtube.com/watch?v=cFTFtuEQ-10
  Go to this link for example : https://codepen.io/harshdeepme/pen/yLzvqbY.
  Try catch only handle runtime error and not parse time error(syntax error )

  NOTE : Throw in an asynchronous invocation will crash your app. e.g
  app.get('/throw', (request, response, next) => {
  setTimeout(()=>{
  throw new Error ("Something went wrong");
  }, 500);
  });
  This will crash your app.

  In order to avoid this use next(). For example :
  app.get('/throw', (request, response, next) => {
  setTimeout(()=>{
  return next(throw new Error ("Something went wrong"));
  }, 500);
  });
  This will not crash your app.

  So, never use throw in a middleware or asynchronous function .Always hav it in a next().

  So to learn error handling, in our server file and all routes file, we will include try and catch and have our code inside it. Refer to these files for syntax.

# Creating error pages

- Create a new template file in views folder. This is our template for error.
- We want create an error handler that shows this error page when no route matches our request.
- We will create a middleware that captures this error. We will place this middleware at the very end after all routes. Which means if none of the routes match, this middleware would execute.
- Go to server.js for code.
- We install an express module called http errors that will help us do this. Command : sudo npm install http-errors. And then require it in our server.js file.
- We create a middleware which had the http-errors module which creates an error
- Then another middleware which renders the error page. We get the information about the error from the previous middleware and store them in response.locals so that only templates which this middleware points to has access to this info. We later pass this info to maker error status and error message dynamic. Refer to the error.ejs file.

# Getting user inputs from feedback page

- Setup the feedack.ejs page and show the existing feedback using variable and loop.
- Enable the submit button by adding method="POST" and action="/feedback" in form div in feedback.ejs
- Then name every input e.g name="name", name="email", name="title", name="message" in <input> div
- Then we go to router.post middleware in feedback.js in routes. We want to get this data in the post middleware somehow. To do this we need another node mocule called body parser. We install this by sudo npm install body-parser. We install this and require it in server.js.
- We include this middleware below cookie-session. You can look up the configuration of body parser on google.
- Next, we want to validate the inputs made by the user. For this we need another node module called express-validator. To install : sudo npm install express-validator. Then we include this in the feedback.js file because we get the inputes there. We require this module in two objects. We do this using destructuring assignment (Know more here : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- Then we go to the post middleware and add a second argument in form of an array :
  -> Check specifies which input to check
  -> Trim removes empty characters in the begining and end
  -> isLength checks on the length of the input (min and max)
  -> escape makes sure that there is no html or javascript embedded in the entry
  -> withMessage : this is the message that should be returned if something is wrong
  -> isEmail checks if the entry is valid email
  -> normalizeEmail adds formating to email, makes it lowercase
- In the post middleware(in feedback.js) we get the error from express validator and store it in session. On submiting the page should redirect to the same page and the error should be shown. So we pass this error to the 'get' middleware and reset the session. From here we pass this error to the template where it gets displayed.
- In the ejs file, if passed variable is false(i,e no error ) then that html doesnt print.

# Storing user inputs

- We can access the user inputs in the post middleware in feedback.js through request.body
- We also want to display a success message on form submission. We do the same thing which we did for errors.

# REST API

- Representational State Transfer : a pattern for writing APIs.
- HTTP Verbs in REST services :
  -> get : to request a webpage
  -> post : mostly used in forms.
  -> put : Update a resource. defined in http standards but not used by browsers
  -> delete : Delete a resource. defined in http standards but not used by browsers
- A REST request usually returns a json file which is used to render the webpage. An https request returns a webpage. Hence we can use rest to dynamically update page without reloading.

# REST APIs for reading and writing feedbacks

We want to read and write feedbacks using rest api. To this we go to the feedback.js file and create a middleware for a new route '/api'(localhost:3000/feedback/api)

# Server files explained

- server.js : contains the code that is rendered to localhost:300
- server1.js : Creating a server and displaying a static message
- server2.js : Creating a server and displaying an existing static html page
- server3.js : Displaying an ejs file with page title as a variable passed from server file.
- server4.js :We want to remove routes from the server and store them seperately in the routes folder.
- server5.js :We want to show data from json files(feedback.json and speakers.json) in the webpage using feedbackService and speakerService.js files.
