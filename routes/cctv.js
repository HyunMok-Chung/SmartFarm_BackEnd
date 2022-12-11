const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json(
		{
			test: "im cctv"
		}
	);
	console.log("cctv get!");
})
router.get('/')

module.exports = router;
