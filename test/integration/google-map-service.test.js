require('dotenv').config();
const { getLocation, getPlaces } = require('../../lib/util/google-map-service');

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
            return getPlaces({ lat: 45.5266975, lng: -122.6880503 }, 'restaurant', 'quiet')
                .then((res) => {
                    console.log(res[0]);
                    expect(res[0].placeId).toEqual('ChIJb-hsVPgJlVQR022187swetk');
                    expect(res[0].name).toEqual('McMenamins Mission Theater');
                    expect(res[0].price).toEqual(2);
                    expect(res[0].types).toEqual(['bar', 'restaurant', 'point_of_interest', 'food', 'establishment']);
                }); 
        });
    });
});
