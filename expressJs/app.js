// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

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

// testing code -------------------------------------------
/*
// chain onto the result of the execute call
db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result[0], result[1]);
    })
    .catch(err => {
        console.log(err);
    });   // in case of error
// --------------------------------------------------------
*/


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


// define the relation ----------------------------------------------
// a user create this product?
Product.belongsTo(User, {
    constraints: true,
    // if delete a user, any product related to the user would also gone
    onDelete: 'CASCADE',
});
// define the inverse
User.hasMany(Product);


// look at all the method you defined
sequelize.sync({ force: true })        // define the table and the relation
    .then(result => {
        // console.log(result);
        app.listen(3000);
    })
    .catch(err => console.log(err));

// const server = http.createServer(app);
// server.listen(3000);
// app.listen(3000);



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
