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

# Server files explained

- server.js : contains the code that is rendered to localhost:300
- server1.js : Creating a server and displaying a static message
- server2.js : Creating a server and displaying an existing static html page
- server3.js : Displaying an ejs file with page title as a variable passed from server file.
