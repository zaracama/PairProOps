'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.Category);
    }
  }
  Game.init({
    title: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: `Name is required`,
      },
      notEmpty: {
        msg: `Name is required`,
      },
    },
    description: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: `Description is required`,
      },
      notEmpty: {
        msg: `Description is required`,
      },
    },
    imageURL: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: `ImageURL is required`,
      },
      notEmpty: {
        msg: `ImageURL is required`,
      },
    },
    developer: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: `Developer is required`,
      },
      notEmpty: {
        msg: `Developer is required`,
      },
    },
    publisher: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: `Publisher is required`,
      },
      notEmpty: {
        msg: `Publisher is required`,
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Category is required`,
        },
        notEmpty: {
          msg: `Category is required`,
        },
      },
    },
  },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Game;
};