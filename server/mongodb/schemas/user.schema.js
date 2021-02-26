const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commonFields = require('../comonFields');
const utils = require('../../helper/utils');

const userSchema = new Schema({
	nickname: { type: String, required: false },
	avatarUrl: { type: String, required: false },
	email: { type: String, required: true },
	phone: { type: String, required: false },
	gender: { type: String, required: false },
	password: { type: String, required: true },
	status: { type: String, required: false },
	...commonFields,
}, {
	toObject: {
		transform(doc, ret) {
			ret.createTime = utils.formatDate(ret.createTime);
			ret.updateTime = utils.formatDate(ret.updateTime);
			delete ret.__v;
			delete ret.password;
		}
	}
});

const UserModel = model('user', userSchema);

module.exports = UserModel;
