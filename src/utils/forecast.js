const request = require('request');
const forecast = ({latitude, longitude}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4561fb4c18f333e92712666b6799faa1&query=${latitude},${longitude}`;
    request({url: url, json:true}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather api", undefined);
        } else if (response.body.error){
            callback("Unable to find location",undefined);
        } else {
            const temp = response.body.current.temperature;
            const feelslike = response.body.current.feelslike;
            callback(undefined,`it's currently ${temp} degrees out. It feels like ${feelslike}`);
        }
    } );
};

module.exports = forecast;

