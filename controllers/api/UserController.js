const { User, UserRole } = require("../../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  index: async (req, res) => {
    res.paginatedResult.data.forEach((element) => {
      delete element.Roles.UserRole;
    });
    res.json(res.paginatedResult);
  },
  show: async (req, res) => {
    delete res.obj.password;
    res.json({
      message: "Data Found!",
      data: res.obj,
    });
  },
  store: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }

    const { name, username, email, RoleId } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    let data = {
      name,
      username,
      email,
      password,
    };

    createdData = await User.create(data);
    await UserRole.create({
      UserId: createdData.id,
      RoleId,
    });
    res.status(201).json({
      message: "Data Successfully Created!",
      data: {
        id: createdData.id,
      },
    });
  },
  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }

    const id = req.params.id;
    const { name, username, email, RoleId } = req.body;
    let data = {
      name,
      username,
      email,
    };

    if (req.body.password) {
      const password = await bcrypt.hash(req.body.password, 10);
      data.password = password;
    }

    await User.update(data, {
      where: {
        id,
      },
    });
    await UserRole.destroy({
      where: {
        UserId: id,
      },
    });
    await UserRole.create({
      UserId: id,
      RoleId,
    });
    res.status(201).json({
      message: "Data Successfully updated!",
    });
  },

  destroy: async (req, res) => {
    const id = req.params.id;
    await UserRole.destroy({
      where: {
        UserId: id,
      },
    });
    await res.obj.destroy();
    res.json({
      message: "Data Successfully Deleted!",
    });
  },
};
