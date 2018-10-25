const { getLocation, getPlaces } = require('../../lib/util/google-map-service');
jest.mock('../../lib/util/google-map-service');

describe('google map integration', () => {
    describe('google location integration', () => {

        it('retrieves lat, lng from zipcode', () => {
            return getLocation(97209)
                .then(({ lat, lng }) => {
                    expect(lat).toEqual(45.5266975);
                    expect(lng).toEqual(-122.6880503);
                });
            
        });
    });

    describe('google places integration', () => {

        it('retrieves results from location query', () => {
            return getPlaces({ lat: 45.5266975, lng: -122.6880503 }, 'restaurant', ['quiet', 'american'])
                .then((res) => {
                    expect(res).toBeTruthy();
                }); 
        });
    });
});
