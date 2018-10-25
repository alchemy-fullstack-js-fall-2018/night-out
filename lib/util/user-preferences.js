const defaultPreferences = [
    ['restaurant', 'cafe', 'food'],
    ['museum', 'movie_theater', 'art_gallery', 'point_of_interest'],
    ['bar', 'night_club']
];

module.exports = user => {
    return Promise.resolve(defaultPreferences);  
};
