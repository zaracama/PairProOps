'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require(`bcryptjs`)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile)
      User.hasMany(models.Order)
      User.belongsToMany(models.Game, {through: "Order"})
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance){
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};