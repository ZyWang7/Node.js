const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/users', (req, res, next) => {
    res.send('<h1> This is User Page</h1>');
});

module.exports = router;
