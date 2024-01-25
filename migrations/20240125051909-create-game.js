'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageURL: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      developer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publisher: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      GameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  }
};