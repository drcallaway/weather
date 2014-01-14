
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Weather' });
};

exports.weather = function(req, res) {

    var weather = {city: 'San Francisco',low: 40, high: 60, description: 'cloudy'}; //populate with sample data

//    res.render('index', { title: 'Weather', weather: weather });
//    return;

    var util = require('util');
    var weatherApi = util.format('http://api.openweathermap.org/data/2.5/find?q=%s&units=%s&mode=json', req.body.city, req.body.units);

    var request = require('request');
    request(weatherApi, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            res.render('index', { title: 'Error'});
            return;
        }

        var rawWeather = JSON.parse(body);

        if (rawWeather.cod !== '200') {
            res.render('index', {title: 'City not found'});
            return;
        }

        var firstItem = rawWeather.list[0];

        weather.city = firstItem.name;
        weather.low = firstItem.main.temp_min;
        weather.high = firstItem.main.temp_max;
        weather.description = firstItem.weather[0].description;

        res.render('index', { title: 'Weather', weather: weather });
    });
};