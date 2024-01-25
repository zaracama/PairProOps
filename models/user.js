'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: 'UserId'
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Username is required`,
          },
          notEmpty: {
            msg: `Username is required`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: `Email is required`,
          },
          notEmpty: {
            msg: `Email is required`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password is required`,
          },
          notEmpty: {
            msg: `Password is required`,
          },
          len: {
            args: [17],
            msg: `Password minimal seventeen characters`,
          },
        },
      }
    },
    {
      sequelize,
      modelName: 'User',
    });
  return User;
};