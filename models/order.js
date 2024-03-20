'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User)
      Order.belongsTo(models.Game)
    }

    get status() {
      if (!this.isPaid) {
        return `Unpaid`
      } else if (this.isPaid && !this.isConfirmed) {
        return `Verifying`
      } else if (this.isPaid && this.isConfirmed) {
        return `Shipped`
      }
    }

    get getUniqueKey() {
      return `${this.UserId}-${this.GameId}-${new Date(this.createdAt)}`
    }

  }
  Order.init({
    totalAmount: DataTypes.INTEGER,
    shippingAddress: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER,
    uniqueKey: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.uniqueKey = instance.getUniqueKey
      }
    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};