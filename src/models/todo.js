'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init(
    {
      activityGroupId: {
        type: DataTypes.INTEGER,
        field: 'activity_group_id',
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM('very high', 'high', 'medium', 'low', 'very low'),
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: 'is_active',
      },
    },
    {
      sequelize,
      modelName: 'Todo',
      tableName: 'Todos',
      underscored: true,
      paranoid: true,
    }
  );
  return Todo;
};
