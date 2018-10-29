const router = require('express').Router();
const Evening = require('../models/Evening');
const User = require('../models/User');
const Log = require('../models/Log');
const ensureAuth = require('../util/ensure-auth');
const createLogs = require('../util/create-logs');

module.exports = router
    .post('/', ensureAuth, (req, res, next) => {
        const { _id: user } = req.user;
        const { zipcode = req.user.zipcode, keywords: customKeywords, popular = false } = req.body;
        const keywords = customKeywords || user.keywords || [];
        createLogs(req.user, zipcode, keywords, popular)
            .then(logs => {
                const price = Log.avgPrice(logs);
                Evening.create({ user, logs, price, zipcode })
                    .then(evening => res.json(evening))
                    .catch(next);
            })
            .catch(next); // make sure to call next here in case of errors
    })

    .put('/:id', ensureAuth, (req, res, next) => {
        const { id } = req.params;
        const { rating } = req.body;
        Evening.findOneAndUpdate(
            { _id: id },
            { rating: rating },
            { new: true, runValidators: true })
            .populate({ path: 'logs', select: { __v: false } })
            .select({ __v: false })
            .lean()
            .then(evening => res.json(evening))
            .catch(next);
    })

    .get('/', ensureAuth, (req, res, next) => {
        const { query } = req;
        // Do we trust this query enough to pass it
        // directly to our database?
        Evening.find({ ...query, user: req.user._id })
            .populate({ path: 'logs', select: { __v: false } })
            .select({ __v: false })
            .lean()
            .then(evenings => res.json(evenings))
            .catch(next);
    })

    .get('/:id', ensureAuth, (req, res, next) => {
        const { id } = req.params;

        Evening.findById(id)
            .populate({ path: 'logs', select: { __v: false } })
            .select({ __v: false })
            .lean()
            .then(evening => res.json(evening))
            .catch(next);
    })

    .get('/popular', ensureAuth, (req, res, next) => {
        const { keyword, zipcode } = req.body;
        User.likedEvenings(keyword, zipcode)
            .then(result => res.json(result))
            .catch(next);
    });


