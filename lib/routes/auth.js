const router = require('express').Router();
const User = require('../models/User');
const { HttpError } = require('../util/errors');
const ensureAuth = require('../util/ensure-auth');

module.exports = router
    .post('/signup', (req, res, next) => {
        const {
            name, clearPassword,
            email, zipcode, keywords
        } = req.body;
        User.create({
            name, clearPassword, email, zipcode, keywords
        }).then(user => {
            res.json(user);
        })
            .catch(next); // make sure to call next here in case of errors
    })
    .post('/signin', (req, res, next) => {
        const { email, clearPassword } = req.body;
        User.findOne({ email })
            .then(user => {
                const correctPassword = user && user.compare(clearPassword);
                if(correctPassword) {
                    const token = user.authToken();
                    res.json({ token });
                } else {
                    next(new HttpError({
                        code: 401,
                        message: 'Bad email or password'
                    }));
                }
            })
            .catch(next); // make sure to call next here in case of errors
    })
    .get('/verify', ensureAuth, (req, res, next) => {
        res.json({ success: !!req.user });
    });


