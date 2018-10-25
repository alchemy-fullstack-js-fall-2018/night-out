const defaultTypes = [
    ['restaurant', 'cafe', 'food', 'bakery'],
    ['museum', 'movie_theater', 'art_gallery', 'point_of_interest', 'amusement_park', 'aquarium', 'bowling_alley', 'spa', 'stadium', 'zoo'],
    ['bar', 'night_club']
];

const defaultKeywords = [];

module.exports = user => {
    let preferences;

    if(user.keywords) {
        preferences = defaultTypes.map(logTypes => ({
            types: logTypes,
            keywords: user.keywords
        }));
    }
    else { 
        preferences = defaultTypes.map(logTypes => ({
            types: logTypes,
            keywords: defaultKeywords
        }));
    }
    return Promise.resolve(preferences);  
};
