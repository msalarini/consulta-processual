const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('consulta_processual', 'consulta_user', 'P@ssw0rd', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;