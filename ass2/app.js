const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('In the user page!');
    res.send('<h1>Users</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>');    // sending a response
});

app.use('/', (req, res, next) => {
    console.log('Welcome to My 2nd task.');
});

app.listen(3000);
