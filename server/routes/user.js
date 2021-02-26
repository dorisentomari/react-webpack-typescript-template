const express = require('express');
const route = express.Router();

const UserModel = require('../mongodb/schemas/user.schema');

route.get('/list', async (req, res) => {
	const userList = await UserModel.find();
	return res.json(userList);
});

route.post('/create', async (req, res) => {
	const user = await UserModel.create(req.body);
	return res.json(user);
});

route.post('/:id/update', async (req, res) => {
	const _id = req.body._id;
	delete req.body._id;
	const user = await UserModel.update({_id}, req.body);
	return res.json(user);
});

route.delete('/:id/delete', async (req, res) => {
	const _id = req.body._id;
	const user = await UserModel.remove({_id});
	return res.json(user);
});

module.exports = route;
