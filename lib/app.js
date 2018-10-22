const express = require('express');
const app = express();
// const checkMongo = require('./util/check-mongo');
const morgan = require('morgan');
const { handler } = require('./util/errors');

app.use(express.static('public'));
app.use(express.json());

const auth = require('./routes/auth');
app.use('/api/auth', auth);

app.use((req, res) => {
    console.log('404');
    res.status(404);
    res.end('404 Not Found');
});

app.use(handler);

module.exports = app;
