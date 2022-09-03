const express = require('express');
// const { readdirSync } = require('fs');
// const path = require('path');

// const rootDir = require('../util/path');
// const adminData = require('./admin');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

//                    will bw able to extract the info by this name
router.get('/products/:productId', shopController.getProduct);
// but... remember to get the more specific routes before this
// e.g.     router.get('/products/delete');

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProd);

// router.get('/checkout', shopController.getCheckout);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;
