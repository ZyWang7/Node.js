const express = require('express');
// const { readdirSync } = require('fs');
// const path = require('path');

// const rootDir = require('../util/path');
// const adminData = require('./admin');

const productsController = require('../conreollers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

module.exports = router;
