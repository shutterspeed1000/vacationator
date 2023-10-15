const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Request extends Model {}
//button functionality for submit request
Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'request',
  }
);

module.exports = Request;
