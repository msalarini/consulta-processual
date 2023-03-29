const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Processo = require('./Processo');

const Movimentacao = sequelize.define('Movimentacao', {
  data: {
    type: DataTypes.DATE,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});


Movimentacao.belongsTo(Processo, { foreignKey: 'processoId', as: 'processo' });
Processo.hasMany(Movimentacao, { foreignKey: 'processoId', as: 'movimentacoes' });

module.exports = Movimentacao;