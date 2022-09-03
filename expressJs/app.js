// const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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
const { application } = require('express');

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


// register a middleware to store the user in request
// so that can use that from anywhere in the app
// for a incoming request -> will execute this function
// npm start never run this anonymous function
// -> only reach this if we successfully  start server with app listen
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            // user -> sequelize object with the value stored in the database
            //      -> with all utility methods sequelize added
            req.user = user;
            next();
        })
        .catch(err => console.error(err));
});


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

User.hasOne(Cart);
Cart.belongsTo(User);       // will add a new field to cart -> userId

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });       // Many-to-Many relationship
// one cart can hold multiple products
// a single product can be part of multiplr different carts
// -> only works with intermediate table -> productId & CartId -> CartItem model

// ------------------------------------------------------------------


// npm start runs the code for the first time -> run sequelize -> not incoming request
// incoming request only funneled through middleware
// look at all the method you defined
sequelize
    // .sync()                    // define the table and the relation
    .sync({ force: true })       // overwrite the table
    .then(result => {
        // console.log(result);
        // create a user
        return User.findByPk(1);
        
    })
    .then(user => {
        if (!user) {
            // if don't have user -> create a new one
            return User.create({
                name: 'Victor',
                email: 'victor@gmail.com'
            });
        }
        // returns a Promise object that is resolved with a given value
        return Promise.resolve(user);
    })
    .then(user => {
        // console.log(user);
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
