const router = require('express').Router();
const Log = require('../models/Log');

module.exports = router
    .post('/', (req, res) => {
        const { place_id, user, name, rating, tags, price } = req.body;
        Log.create({ place_id, user, name, rating, tags, price })
            .then(log => res.json(log));
    });
