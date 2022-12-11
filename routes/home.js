const express = require('express');
const request = require('request');
const router = express.Router();

router.post('/', (req, res) => {
	//request({ uri: "http://192.168.0.23:3001/", method: "GET", timeout: 10000, followRedirect: true, maxRedirects: 10 }, function (error, response, body) { console.log(body); });
	res.json(
		{
			test: "im home2"
		}
	);
	console.log("home get!");
})

module.exports = router;
