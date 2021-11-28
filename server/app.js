const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');

const connectMongoDB = require('./mongodb');
const initRoute = require('./routes');

const app = express();
const PORT = 18888;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE');
	res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
	if (req.method === 'OPTIONS') {
		return res.end();
	}
	next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(morgan('combined'));

(async function () {
	try {
		await connectMongoDB();
	} catch (err) {
		console.log('连接数据库失败');
		console.log(err);
	}
})();

initRoute(app);

app.use(history({
	rewrites: [
		{ from: /^\/abc$/, to: '/' }
	]
}));

app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function (req, res) {
	res.sendFile('../build/index.html');
});

app.listen(PORT, err => {
	if (err) {
		console.log(err);
	} else {
		console.log(`react-webpack-typescript-template test server is running at http://localhost:${PORT}`);
	}
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
	console.log(error);
	const {method, path, hostname} = req;
	res.status(500).json({method, hostname, path,});
});
