'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = require("../data/users.json")
      .map(el => {
        delete el.id;
        el.createdAt = el.updatedAt = new Date();
        return el;
      });
    await queryInterface.bulkInsert("Users", userData)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  },
};