/* eslint-disable no-console */
const express = require('express');
const app = express();
const morgan = require('morgan');
const { handler } = require('./util/errors');
const bearerToken = require ('./util/bearer-token');

app.use(morgan('dev', {
    skip() {
        return process.env.NODE_ENV === 'test';
    }
}));

app.use(express.static('public'));
app.use(express.json());
app.use(bearerToken);

const auth = require('./routes/auth');
const logs = require('./routes/logs');
app.use('/api/auth', auth);
app.use('/api/logs', logs);
app.use('/api/evenings', require('./routes/evenings'));

app.use((req, res) => {
    console.log('404');
    res.status(404);
    res.end('404 Not Found');
});

app.use(handler);

module.exports = app;

