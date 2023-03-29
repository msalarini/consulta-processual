const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Processo = sequelize.define('Processo', {
  cnj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  partes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tribunal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Processo;