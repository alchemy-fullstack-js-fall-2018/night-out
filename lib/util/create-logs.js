const Log = require('../models/Log');
const getPreferences = require('./user-preferences');
const { getLocation, getPlaces } = require('./google-map-service');


const getRandomType = types => {
    return types[0];
};

const getRandomPlace = place => {
    return place[0];
};


module.exports = (user, zipcode, keywords) => {
    return getLocation(zipcode)
        .then(location => {
            return Promise.all([Promise.resolve(location), getPreferences(user, keywords)]);
        })
        .then(([location, userPrefs]) => {
            return Promise.all(userPrefs.map(logPref => {
                const type = getRandomType(logPref.types);
                const keywords = logPref.keywords;
                return getPlaces(location, type, keywords);
            }));
        })
        .then(logPlaces => {
            const logsObj = logPlaces
                .filter(logPlace => logPlace.length > 0)
                .map(getRandomPlace)
                .map(logPlace => ({
                    place_id: logPlace.placeId,
                    user: user._id,
                    tags: logPlace.types,
                    name: logPlace.name,
                    price: logPlace.price || 2
                }));
            return Log.create(logsObj);
        });
};
