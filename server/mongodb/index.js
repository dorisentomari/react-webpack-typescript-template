const path = require('path');
const mongoose = require('mongoose');
const glob = require('glob');
const bluebird = require('bluebird');
const chalk = require('chalk');

function initSchemas() {
	glob.sync(path.resolve(__dirname, './schemas/', '**/*.schema.js')).forEach(require);
}

async function connectMongoDB(uri, callback) {
	mongoose.Promise = bluebird.Promise;

	initSchemas();

	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	mongoose.set('debug', true);

	try {
		await mongoose.connect(uri || 'mongodb://localhost:27017/react_webpack_template_server', options);
		console.log(chalk.green('MongoDB database connect success...'));
		callback && callback();
	} catch (error) {
		console.error('MongoDB database connect failed!!!');
		console.error(error);
	}

	mongoose.connection.on('error', error => {
		console.error('connect MongoDB database error!!!');
		console.error(error);
	});

	mongoose.connection.on('disconnected', () => {
		console.error('connect MongoDB database interrupt!!!');
	});

	mongoose.connection.once('open', () => {
		console.log('MongoDB database opened...');
	});
}

module.exports = connectMongoDB;
