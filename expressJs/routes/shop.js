const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('In another middleware!');
    // res.send('<h1>Hello from express</h1>');
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
    // __dirname -> holds the absolute path on operating system to this project folder
});

module.exports = router;
