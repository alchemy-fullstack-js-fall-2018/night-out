const likedEveningsBySimilarUsers = (keyword, zipcode) => {
    return [
        { $match: { keywords: { $in: [keyword] } } },
        { $lookup: { from: 'evenings', localField: '_id', foreignField: 'user', as: 'evenings' } },
        { $unwind: '$evenings' },
        { $match: { 'evenings.rating': 'liked', 'evenings.zipcode': zipcode } },
        { $lookup: { from: 'logs', localField: 'evenings.logs', foreignField: '_id', as: 'logs' } },
        { $group: { _id: '$logs.place_id', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
        { $unwind: '$_id' },
        { $lookup: { from: 'logs', localField: '_id', foreignField: 'place_id', as: 'logs' } },
        { $unwind: '$logs' },
        { $group: { _id: '$_id', log: { $first: '$logs' } } }
    ];
};

module.exports = {
    likedEveningsBySimilarUsers
};
