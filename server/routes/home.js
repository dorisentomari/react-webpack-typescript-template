const express = require('express');
const route = express.Router();

route.get('/home', (req, res) => {
	return res.json({ status: true });
});

module.exports = route;
