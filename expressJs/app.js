// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

// create an express application -> valid request handler
const app = express();
/*
app.use('/', (req, res, next) => {      // every route starts with a '/'
    // console.log('This always runs!');
    next();
});
*/


// register some middleware
app.use(bodyParser.urlencoded({extended: false}));


app.use('/add-product', (req, res, next) => {
    // console.log('In the first middleware!');
    // res.send('<h1>The "Add Product" Page</h1>');    // sending a response
    res.send('<form action="/product" method="post">' +
             '<input type="text" name="title">' +
             '<button type="submit">Add product</button></form>');
});

/*
app.use('/product', (req, res, next) => {
    console.log(req.body);      // { title: 'Milk' }
    res.redirect('/');
});     // always executed -> for both POST and GET request

// only for GET request
app.get('/product', (req, res, next) => {
    console.log(req.body);      // { title: 'Milk' }
    res.redirect('/');
});
*/

// only for POST request
app.post('/product', (req, res, next) => {
    console.log(req.body);      // { title: 'Milk' }
    res.redirect('/');
});


app.use('/', (req, res, next) => {
    // console.log('In another middleware!');
    res.send('<h1>Hello from express</h1>');
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
