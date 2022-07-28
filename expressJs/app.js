// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// create an express application -> valid request handler
const app = express();


// allow to set any value globally on express application
app.set('view engine', 'pug');      // compile dynamic templates with the pig engine
// view engine -> default engine extension to use when omitted
//             -> for any dynamic templates we try to render, use this specific engine
app.set('views', 'views');      // templates in the folder called views
// views -> tell express where to find the dynamic views


const adminData = require('./routes/admin');
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
app.use('/admin', adminData.routes);
app.use(shopRoutes);

// handle 404 not found page
app.use((req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>');
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    res.status(404).render('404', {docTitle: 'Page Not Found'})
});

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
