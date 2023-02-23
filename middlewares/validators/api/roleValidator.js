const { body } = require("express-validator");
const { Role } = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  store: [
    body("name")
      .isLength({ min: 1 })
      .custom(async (name) => {
        const getRole = await Role.findOne({
          where: {
            name,
          },
        });
        if (getRole) {
          return Promise.reject("Role name was already created!");
        }
      }),
  ],
  update: [
    body("name")
      .isLength({ min: 1 })
      .custom(async (name, { req }) => {
        const id = req.params.id;
        const getRole = await Role.findOne({
          where: {
            id: {
              [Op.ne]: id,
            },
            name,
          },
        });
        if (getRole) {
          return Promise.reject("Role name was already created!");
        }
      }),
  ],
  store_permission: [
    body("permissions").isArray().isLength({ min: 1 }),
    body("permissions.*").isLength({ min: 1 }),
  ],
};
