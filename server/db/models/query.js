const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
