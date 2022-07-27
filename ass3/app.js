const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(3000);
