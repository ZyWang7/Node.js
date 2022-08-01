const express = require('express');
const path = require('path');

// const rootDir = require('../util/path');

const productsController = require('../controllers/product');

// mini express app tied to the other express app
const router = express.Router();

// work exactly the same way as the app function
// pass a reference to function
router.get('/add-product', productsController.getAddProduct);

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
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;
