const router = require('express').Router();
const Evening = require('../models/Evening');
const Log = require('../models/Log');
const ensureAuth = require('../util/ensure-auth');
const createLogs = require('../util/create-logs');

module.exports = router
    .post('/', ensureAuth, (req, res, next) => {
        const { _id: user } = req.user;
        console.log(req.user);
        const { zipcode } = req.body;
        createLogs(req.user, zipcode).then(logs => {
            const price = Log.avgPrice(logs);
            Evening.create({ user, logs, price })
                .then(evening => res.json(evening))
                .catch(next);
        });
    });
