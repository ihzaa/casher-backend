"use strict";
const { User } = require("../models/");
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("1234", 10);
    return queryInterface.bulkInsert(User.tableName, [
      {
        name: "SuperAdmin",
        username: "superadmin",
        email: "superadmin@example.com",
        password: password,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(User.tableName, null, {});
  },
};
