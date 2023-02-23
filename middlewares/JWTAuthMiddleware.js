const { verify } = require("jsonwebtoken");
const { User, Role } = require("../models/");

const validateToken = async (req, res, next) => {
  const accessToken = req.header("x-access-token");

  if (!accessToken)
    return res.status(400).json({ errors: { message: "User Not Logged In!" } });

  try {
    const validToken = verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    if (validToken) {
      req.user = await User.findByPk(validToken.id, {
        attributes: ["id", "name", "username", "email"],
        include: {
          model: Role,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      });
      return next();
    }
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
};

module.exports = { validateToken };
