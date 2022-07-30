const express = require('express');

const router = express.Router();
const names = [];

router.get('/', (req, res, next) => {
    res.render('add-user', { 
        docTitle: 'Add Users'
    });
});

router.post('/', (req, res, next) => {
    names.push({ title: req.body.title });
    console.log(req.body);
    res.redirect('/users');
});

exports.routes = router;
exports.names = names;
