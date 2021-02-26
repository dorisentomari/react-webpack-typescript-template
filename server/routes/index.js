const homeRoute = require('./home');
const userRoute = require('./user');

function initRoute(app) {
	app.use('/api', homeRoute);
	app.use('/api/user', userRoute);
}

module.exports = initRoute;
