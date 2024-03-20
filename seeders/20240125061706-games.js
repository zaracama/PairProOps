'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const gameData = require("../data/games.json")
      .map(el => {
        delete el.id;
        el.createdAt = el.updatedAt = new Date();
        return el;
      });
    await queryInterface.bulkInsert("Games", gameData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {})
  },
};