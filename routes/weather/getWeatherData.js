const { json } = require('body-parser');
const request = require('request');
require('dotenv').config();

const { WEATHER_KEY, WEATHER_URL } = process.env;


const getWeatherData = (req, callback) => {
	const url = WEATHER_URL;
	let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + WEATHER_KEY; /*Service Key*/
	queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
	queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
	queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
	queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(req.body.date); /**/
	queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(req.body.time); /**/
	queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(req.body.latitude); /**/
	queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(req.body.longitude); /**/
	console.log(url + queryParams);
	request(
		{
			url: url + queryParams,
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		}, function (err, response, body) {
		console.log(body);
		callback({
			data: body
		})
	}
	)
}

module.exports = getWeatherData;
