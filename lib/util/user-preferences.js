const defaultTypes = [
    ['restaurant', 'cafe', 'food', 'bakery'],
    ['museum', 'movie_theater', 'art_gallery', 'point_of_interest', 'amusement_park', 'aquarium', 'bowling_alley', 'spa', 'stadium', 'zoo'],
    ['bar', 'night_club']
];

const defaultKeywords = [];

module.exports = (user, customKeywords) => {
   
    const keywords = customKeywords || user.keywords || defaultKeywords;
    const preferences = defaultTypes.map(logTypes => ({
        types: logTypes,
        keywords: keywords
    }));
    return Promise.resolve(preferences);  
};
