const db = require('../db');
const User = require('./user');
const Query = require('./query');

User.belongsToMany(Query, { through: 'user_query' });

module.exports = {
	db,
	User,
	Query,
};
