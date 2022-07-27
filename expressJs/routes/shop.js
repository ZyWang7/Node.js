const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('In another middleware!');
    // res.send('<h1>Hello from express</h1>');
    
    // __dirname -> holds the absolute path on operating system to this project folder
    // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));

    console.log('shop: ', adminData.products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
