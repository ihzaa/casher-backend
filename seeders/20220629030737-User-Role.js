"use strict";
const { UserRole, User, Role } = require("../models/");

module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await User.findOne({
      where: {
        username: "superadmin",
      },
    });
    const role = await Role.findOne({
      where: {
        name: "Super-Admin",
      },
    });
    return queryInterface.bulkInsert(UserRole.tableName, [
      {
        UserId: user.id,
        RoleId: role.id,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(UserRole.tableName, null, {});
  },
};
