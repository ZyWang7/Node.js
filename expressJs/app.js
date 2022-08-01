// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const errorController = require('./controllers/error');

// create an express application -> valid request handler
const app = express();

/*  PUG -----------------------------------------------------------------------
// allow to set any value globally on express application
app.set('view engine', 'pug');      // compile dynamic templates with the pig engine
// view engine -> default engine extension to use when omitted
//             -> for any dynamic templates we try to render, use this specific engine
app.set('views', 'views');      // templates in the folder called views
// views -> tell express where to find the dynamic views
*/


/*
// Handlebar ------------------------------------------------------------------
const exphbs = require('express-handlebars');
// register a new templating engine -> express-handlebars is not built-in
app.engine('hbs', exphbs.engine({ 
    extname: 'hbs', 
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout', 
}));     // return the initialized view engine
app.set('view engine', 'hbs');
app.set('views', 'views');
*/


// EJS ------------------------------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/*
app.use('/', (req, res, next) => {      // every route starts with a '/'
    // console.log('This always runs!');
    next();
});
*/


// register some middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

// order does matter!
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// handle 404 not found page
app.use(errorController.get404);

// const server = http.createServer(app);
// server.listen(3000);
app.listen(3000);



/*
// add a middleware function
// accepts an array of request handlers
//                 next: a function that will be passed to 
// this [(req, res, next) => {} ]function by express.js
app.use((req, res, next) => {
    console.log('In the middleware!');
    next();         // allows the request to go to the next middleware in line
});      // () => {}: will be executed for every incoming request
*/
