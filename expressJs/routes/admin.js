const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

// mini express app tied to the other express app
const router = express.Router();

const products = [];

// work exactly the same way as the app function
router.get('/add-product', (req, res, next) => {
    // console.log('In the first middleware!');
    // res.send('<h1>The "Add Product" Page</h1>');    // sending a response
    // res.send('<form action="/admin/add-product" method="post">' +
    //          '<input type="text" name="title">' +
    //          '<button type="submit">Add product</button></form>');

    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    res.render('add-product', {docTitle: 'Add Products'});
});

/*
router.use('/product', (req, res, next) => {
    console.log(req.body);      // { title: 'Milk' }
    res.redirect('/');
});     // always executed -> for both POST and GET request

// only for GET request
router.get('/product', (req, res, next) => {
    console.log(req.body);      // { title: 'Milk' }
    res.redirect('/');
});
*/

// only for POST request
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    console.log(req.body);      // { title: 'Milk' }
    res.redirect('/');
});

// module.exports = router;
exports.routes = router;
exports.products = products;
