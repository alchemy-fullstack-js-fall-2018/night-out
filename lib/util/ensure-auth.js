const User = require('../models/User');
const { HttpError } = require('./errors');

module.exports = (req, res, next) => {
    const token = req.token;
    if(!token) {
        next(new HttpError({
            code: 401,
            message: 'Incorrect email or password.'
        }));
        return;
    }
};
