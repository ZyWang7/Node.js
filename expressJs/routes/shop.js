const express = require('express');
const { readdirSync } = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('In another middleware!');
    // res.send('<h1>Hello from express</h1>');
    
    // __dirname -> holds the absolute path on operating system to this project folder
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));

    // console.log('shop: ', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

    const products = adminData.products;

    // use the default template engine and return that template
    //                  convert object to .pug file
    res.render('shop', {
        prods: products, 
        docTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        // layout: false       // would not use the default layout?
    });     // look for shop.pug file
});

module.exports = router;
