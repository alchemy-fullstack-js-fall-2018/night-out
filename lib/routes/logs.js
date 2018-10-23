const router = require('express').Router();
const Log = require('../models/Log');

module.exports = router
    .post('/', (req, res) => {
        const { place_id, user_id, rating, tags, price } = req.body;
        Log.create({ place_id, user_id, rating, tags, price })
            .then(log => res.json(log));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;
        const { rating } = req.body;
        Log.findByIdAndUpdate(
            { _id: id }, 
            { rating: rating },
            { new: true, runValidators: true })
            .then(result => {
                res.json(result);
            });
    })