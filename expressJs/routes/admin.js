const express = require('express');
const path = require('path');

// const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

// mini express app tied to the other express app
const router = express.Router();

// work exactly the same way as the app function
// pass a reference to function
router.get('/add-product', adminController.getAddProduct);

// /admin/product => GET
router.get('/products', adminController.getProducts);


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
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;
