const request = require('request');

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5kcmVhYmlzaW8iLCJhIjoiY2xia2d4NGp4MDA3ZTN3bWVzYjhibHZqZyJ9.MnTANvsiK6TYQyFpS0XFKw&limit=1`;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!',undefined);
        } else if (response.body.features.length == 0) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
                const feauture = response.body.features[0];
                const longitude = feauture.center[0];
                const latitude = feauture.center[1];
                const location = feauture.place_name;
                const data = {
                    latitude,
                    longitude,
                    location
                }
                callback(undefined,data);
        }
    });
}
module.exports = geocode;