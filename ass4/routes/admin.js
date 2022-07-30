const express = require('express');

const router = express.Router();
const products = [];

router.get('/', (req, res, next) => {
    res.render('add-user', { 
        docTitle: 'Add Users',
        path: '/'
    });
});

router.post('/', (req, res, next) => {
    products.push({ title: req.body.title });
    console.log(req.body);
    res.redirect('/users');
});

exports.routes = router;
exports.products = products;
