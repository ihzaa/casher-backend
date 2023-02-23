"use strict";
const { Role } = require("../models/");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(Role.tableName, [
      {
        name: "Super-Admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(Role.tableName, null, {});
  },
};
