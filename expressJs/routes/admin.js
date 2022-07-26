const express = require('express');

// mini express app tied to the other express app
const router = express.Router();

// work exactly the same way as the app function
router.get('/add-product', (req, res, next) => {
    // console.log('In the first middleware!');
    // res.send('<h1>The "Add Product" Page</h1>');    // sending a response
    res.send('<form action="/product" method="post">' +
             '<input type="text" name="title">' +
             '<button type="submit">Add product</button></form>');
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
router.post('/product', (req, res, next) => {
    console.log(req.body);      // { title: 'Milk' }
    res.redirect('/');
});

module.exports = router;
