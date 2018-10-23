const router = require('express').Router();
const Evening = require('../models/Evening');
const ensureAuth = require('../util/ensure-auth');


module.exports = router
    .post('/', ensureAuth, (req, res, next) => {
        const { user_id, rating, logs, price } = req.body;
        Promise.all([
            Evening.create({ user_id, rating, logs })
            Log.create({ user_id, rating, price, tags: ['toUpdate'] })

        ])
            .then(([evening, logs]) => res.json(([evening, logs]));
    });
    