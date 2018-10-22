const router = require('express').Router();
const User = require('../models/User');
const { HttpError } = require('../util/errors');
const ensureAuth = require('../util/ensure-auth');

module.exports = router
    .post('/signup', (req, res, next) => {
        const { 
            name, clearPassword, 
            email, zipcode, initialPreferences 
        } = req.body;
        User.create({
            name, clearPassword, email, zipcode, initialPreferences
        }).then(user => {
            res.json(user);
        });
    });

