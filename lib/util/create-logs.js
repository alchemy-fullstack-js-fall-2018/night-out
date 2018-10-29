const Log = require('../models/Log');
const User = require('../models/User');
const getPreferences = require('./user-preferences');
const { getLocation, getPlaces } = require('./google-map-service');

const randomIndex = arr => Math.floor(Math.random() * (arr.length - 1));

const getRandomItem = arr => arr[randomIndex(arr)];

const toLog = userId => place => ({
    place_id: place.place_id,
    user: userId,
    tags: place.tags,
    name: place.name,
    price: place.price || 2
});

const createNewLogs = (user, zipcode, keywords) => {
    return getLocation(zipcode)
        .then(location => Promise.all([Promise.resolve(location), getPreferences(user, keywords)]))
        .then(([location, userPrefs]) => {
            return Promise.all(userPrefs.map(({ types, keywords }) => {
                const type = getRandomItem(types);
                return getPlaces(location, type, keywords);
            }));
        })
        .then(logPlaces => {
            return logPlaces
                .filter(logPlace => logPlace.length > 0)
                .map(getRandomItem)
                .map(toLog(user._id));
        })
        .then(Log.create);
};

const createPopularLogs = (user, zipcode, keywords) => {
    return User.popularEvenings(getRandomItem(keywords), zipcode)
        .then(placeLogs => placeLogs.map(placeLog => placeLog.log))
        .then(toLog(user._id))
        .then(logs => {
            if(logs.length > 0) {
                Log.create(logs);
            } else {
                createNewLogs(user, zipcode, keywords);
            }
        });
};

module.exports = (user, zipcode, keywords, popular) => {

    // Put popular logs in a function so that it is easier to debug,
    // reason about, and look at.
    if(keywords && popular) {
        return createPopularLogs(user, zipcode, keywords);
    } else {
        return createNewLogs(user, zipcode, keywords);
    }
};
