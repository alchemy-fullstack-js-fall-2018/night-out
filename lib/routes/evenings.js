const router = require('express').Router();
const Evening = require('../models/Evening');
const Log = require('../models/Log');
const ensureAuth = require('../util/ensure-auth');
const createLogs = require('../util/create-logs');

module.exports = router
    .post('/', ensureAuth, (req, res, next) => {
        const { _id: user_id } = req.user;
        createLogs(req.user).then(logs => {
            const price = Log.avgPrice(logs);
            Evening.create({ user_id, logs, price })
                .then(evening => res.json(evening))
                .catch(next);
        });
    });
