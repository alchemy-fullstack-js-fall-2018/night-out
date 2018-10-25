const { getUsers } = require('../e2e/mockData');
const userPreferences = require('../../lib/util/user-preferences');

describe('user preferences', () => {
    it('returns default prefs', () => {
        return userPreferences({})
            .then(prefs => {
                expect(prefs).toEqual([
                    {
                        keywords: [],
                        types: ['restaurant', 'cafe', 'food', 'bakery']
                    },
                    {
                        keywords: [],
                        types: ['museum', 'movie_theater', 'art_gallery', 'point_of_interest', 'amusement_park', 'aquarium', 'bowling_alley', 'spa', 'stadium', 'zoo']
                    },
                    {
                        keywords: [],
                        types: ['bar', 'night_club']
                    }
                ]);
            });
    });

    it('returns results by user prefs', () => {
        const users = getUsers();
        const user = users[0];
        
        return userPreferences(user)
            .then(prefs => {
                expect(prefs).toEqual([
                    {
                        keywords: ['japanese', 'cheap', 'cocktails'],
                        types: ['restaurant', 'cafe', 'food', 'bakery']
                    },
                    {
                        keywords: ['japanese', 'cheap', 'cocktails'],
                        types: ['museum', 'movie_theater', 'art_gallery', 'point_of_interest', 'amusement_park', 'aquarium', 'bowling_alley', 'spa', 'stadium', 'zoo']
                    },
                    {
                        keywords: ['japanese', 'cheap', 'cocktails'],
                        types: ['bar', 'night_club']
                    }
                ]);
            });
    });
});
