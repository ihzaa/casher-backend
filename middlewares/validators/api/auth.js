const { body } = require("express-validator");
const { User } = require("../../../models");

module.exports = {
  register: [
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
  ],

  login: [
    body("username").isLength({ min: 1 }),
    body("password").isLength({ min: 1 }),
  ],
};
