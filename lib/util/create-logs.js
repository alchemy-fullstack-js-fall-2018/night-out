const Log = require('../models/Log');
const User = require('../models/User');
const getPreferences = require('./user-preferences');
const { getLocation, getPlaces } = require('./google-map-service');

const randomIndex = arr => {
    return Math.floor(Math.random() * (arr.length - 1));
};


const getRandomType = types => {
    return types[randomIndex(types)];
};

const getRandomPlace = place => {
    return place[randomIndex(place)];
};

const createNewLogs = (user, zipcode, keywords) => {
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

module.exports = (user, zipcode, keywords, popular) => {
    if(keywords && popular) {
        return User.likedEvenings(keywords[randomIndex(keywords)], zipcode)
            .then(placeLogs => {
                if(placeLogs.length) {
                    return placeLogs.map(logPlace => {
                        return {
                            place_id: logPlace.log.place_id,
                            user: user._id,
                            tags: logPlace.log.tags,
                            name: logPlace.log.name,
                            price: logPlace.log.price
                        };
                    });
                } else {
                    return [];
                }
            })
            .then(logs => {
                if(logs.length > 0) {
                    return Log.create(logs);
                } else {
                    return createNewLogs(user, zipcode, keywords);
                }
            });
    } else {
        return createNewLogs(user, zipcode, keywords);
    }
    
};
