const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/users', (req, res, next) => {
    const products = adminData.products;
    res.render('users', {
        prods: products, 
        docTitle: 'Users',
    });
});

module.exports = router;
