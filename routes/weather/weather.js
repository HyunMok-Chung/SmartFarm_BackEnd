const request = require('request');
const express = require('express');
const getWeatherData = require('./getWeatherData');
const router = express.Router();



router.post('/', (req, res) => {
	var weatherData;
	getWeatherData(req, ({data} = {}) =>
		{
			return (res.json(data));
		});
	console.log(req.body);
	console.log("weather get!");


})

module.exports = router;
