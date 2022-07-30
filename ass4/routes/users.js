const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/users', (req, res, next) => {
    const names = adminData.names;
    res.render('users', {
        names: names, 
        docTitle: 'Users',
    });
});

module.exports = router;
