'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.hasMany(models.Order)
      Game.belongsToMany(models.User, { through: "Order" })
    }

    get afterTax() {
      return Math.round(this.price * 1.11)
    }

    get title() {
      return `${this.productionYear} ${this.name}`
    }
  }
  Game.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is required`
        },
        notEmpty: {
          msg: `Name is required`
        }
      }
    },
    productionYear: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Production Year is required`
        },
        notEmpty: {
          msg: `Production Year is required`
        },
        validYear(value) {
          let currentYear = new Date().toISOString().slice(0, 4) 
          if (value > currentYear) {
            throw new Error(`Max Year is this year`)
          } else if (value < (currentYear - 15)) {
            throw new Error(`Min Year is 15 years ago`)
          }
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Stock is required`
        },
        notEmpty: {
          msg: `Stock is required`
        }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Color is required`
        },
        notEmpty: {
          msg: `Color is required`
        },
        validColor(value) {
          if (value.length > 10) {
            throw new Error(`Color maximum 10 characters`)
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price is required`
        },
        notEmpty: {
          msg: `Price is required`
        },
        validPrice(value) {
          if (value < 100000000) {
            throw new Error(`Price minimum 100.000.000`) 
          }
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Description is required`
        },
        notEmpty: {
          msg: `Description is required`
        }
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Game Image is required`
        },
        notEmpty: {
          msg: `Game Image is required`
        },
        isUrl: {
          msg: `Game Image must be URL format`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};