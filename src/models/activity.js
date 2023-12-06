'use strict';
const { Model, HasMany } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Activity.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNul: false,
      },
    },
    {
      sequelize,
      modelName: 'Activity',
      tableName: 'Activities',
      underscored: true,
      paranoid: true,
    }
  );
  // Activity.hasMany(Todo)
  return Activity;
};
