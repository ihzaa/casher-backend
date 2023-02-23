const { body } = require("express-validator");
const { User, Role } = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  store: [
    body("name").isLength({ min: 1 }),
    body("username")
      .isLength({ min: 1 })
      .custom(async (username) => {
        const getUser = await User.findOne({
          where: {
            username,
          },
        });
        if (getUser) {
          return Promise.reject("username already in use");
        }
      }),
    body("email")
      .isLength({ min: 1 })
      .isEmail()
      .custom(async (email) => {
        const getUser = await User.findOne({
          where: {
            email,
          },
        });
        if (getUser) {
          return Promise.reject("Email already in use");
        }
      }),
    body("password").isLength({ min: 8 }),
    body("RoleId")
      .isNumeric()
      .isLength({ min: 1 })
      .custom(async (RoleId) => {
        const getData = await Role.findOne({
          where: {
            id: RoleId,
          },
        });
        if (!getData) {
          return Promise.reject("RoleId is doesn't exist!");
        }
      }),
  ],
  update: [
    body("name").isLength({ min: 1 }),
    body("username")
      .isLength({ min: 1 })
      .custom(async (username, { req }) => {
        const id = req.params.id;
        const getUser = await User.findOne({
          where: {
            id: {
              [Op.ne]: id,
            },
            username,
          },
        });
        if (getUser) {
          return Promise.reject("username already in use");
        }
      }),
    body("email")
      .isLength({ min: 1 })
      .isEmail()
      .custom(async (email, { req }) => {
        const id = req.params.id;
        const getUser = await User.findOne({
          where: {
            id: {
              [Op.ne]: id,
            },
            email,
          },
        });
        if (getUser) {
          return Promise.reject("Email already in use");
        }
      }),
    body("password").optional().isLength({ min: 8 }),
    body("RoleId")
      .isNumeric()
      .isLength({ min: 1 })
      .custom(async (RoleId) => {
        const getData = await Role.findOne({
          where: {
            id: RoleId,
          },
        });
        if (!getData) {
          return Promise.reject("RoleId is doesn't exist!");
        }
      }),
  ],
};
