const moment = require('moment');

function formatDate(date = new Date(), needTime= true) {
	if (needTime) {
		return moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss');
	}
	return moment(new Date(date)).format('YYYY-MM-DD');
}

module.exports = {
	formatDate,
};
