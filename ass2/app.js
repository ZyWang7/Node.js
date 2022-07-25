const express = require('express');

const app = express();

/* task2.2
app.use((req, res, next) => {
    console.log('In the user page!');
    next();
});

app.use((req, res, next) => {
    console.log('Welcome to My 2nd task.');
    res.send('<p>Assignment solved</p>');
});
*/

app.use('/users', (req, res, next) => {
    console.log('In the user page!');
    res.send('<h1>Users</h1><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul>');
});

app.use('/', (req, res, next) => {
    console.log('Welcome to My 2nd task.');
    res.send('<h1>Homepage</h1>');
});

app.listen(3000);
