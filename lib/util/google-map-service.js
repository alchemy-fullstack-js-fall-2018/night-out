const request = require('superagent');
const apiKey = process.env.PLACES_API_KEY;

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

//setup for dynamic request to google api?
const getGeocodeUrl = address => `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
const getPlacesUrl = ({ lat, lng }, types, keywords) => `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat} ${lng}&radius=1500&type=${types}&keyword=${keywords}&key=${apiKey}`;

const get = url => request.get(url).then(res => res.body);

const processGeocode = data => {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
};

const processPlaces = data => {
    const { results } = data;
    return results.map(place => ({
        placeId: place.place_id,
        types: place.types,
        name: place.name
    }));
};

const getLocation = address =>  {
    return get(getGeocodeUrl(address))
        .then(processGeocode);
};

const getPlaces = (location, types, keywords) => {
    const url = getPlacesUrl(location, types, keywords)
    console.log('this is url', url);
    return get(url)
        .then(data => {
            return processPlaces(data);
        });
};

module.exports = {
    getLocation,
    getPlaces
};

