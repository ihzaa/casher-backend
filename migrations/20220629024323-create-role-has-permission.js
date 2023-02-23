"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RoleHasPermissions", {
      PermissionId: {
        type: Sequelize.INTEGER,
      },
      RoleId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RoleHasPermissions");
  },
};
