/* eslint-disable no-unused-vars */
const getLocation = address => {
    return Promise.resolve({
        lat: 45.5266975, 
        lng: -122.6880503
    });
};

const getPlaces = (location, type, keywords) => {
    return Promise.resolve([
        {
            placeId: '1234',
            types: [type],
            name: 'some restaurant',
            price: 2
        },
        {
            placeId: '12345',
            types: [type],
            name: 'another restaurant',
            price: 2
        },
        {
            placeId: '123456',
            types: [type],
            name: 'third restaurant',
            price: 1
        },
    ]);
};

module.exports = {
    getLocation,
    getPlaces
};
