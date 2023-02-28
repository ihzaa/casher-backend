import user from "../../models/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config().parsed;
const { sign, verify } = jsonwebtoken;

const getAccessToken = (payload) => {
  return sign(payload, env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: env.JWT_ACCESS_TOKEN_LIFE,
  });
};
const getRefreshToken = (payload) => {
  return sign(payload, env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: env.JWT_REFRESH_TOKEN_LIFE,
  });
};

async function register(req, res) {
  try {
    const { full_name, email, status, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    let data = {
      full_name,
      email,
      status,
      role,
      password,
    };

    await user.create(data);

    return res.status(200).json({
      message: "Registration Success",
    });
  } catch (err) {
    return res.status(err.code ?? 500).json({
      status: false,
      message: err.message,
    });
  }
}
async function login(req, res) {
  const { email, password } = req.body;
  const logedInUser = await user.findOne({
    email,
  });

  if (!logedInUser) {
    res.status(400).json({
      status: false,
      message: "Wrong Username And Password Combination",
    });
  } else {
    bcrypt.compare(password, logedInUser.password).then(async (match) => {
      if (!match)
        res.status(400).json({
          status: false,
          message: "Wrong Username And Password Combination",
        });
      else {
        const accessToken = getAccessToken({
          email: logedInUser.email,
          id: logedInUser.id,
        });

        const refreshToken = getRefreshToken(
          { email: logedInUser.email, id: logedInUser.id }
        );

        // logedInUser.refresh_token = refreshToken;
        // await logedInUser.save();

        return res.json({
          access_token: accessToken,
          refresh_token: refreshToken,
          email: logedInUser.email,
          message: "Login Success!",
        });
      }
    });
  }
}
async function refresh_token(req, res) {
  const { refresh_token } = req.body;
  if (!refresh_token)
    return res
      .status(400)
      .json({ message: "refresh token is required", status: false });

  // const user = await user.findOne({
  //   where: {
  //     refresh_token,
  //   },
  // });

  // if (!user)
  //   return res
  //     .status(400)
  //     .json({ error: { message: "refresh token doesn't exist!" } });

  verify(refresh_token, env.JWT_REFRESH_TOKEN_SECRET, (err, data) => {
    if (err)
      return res.status(400).json({
        error: err,
      });

    const { username, id } = data;
    const accessToken = getAccessToken({ username, id });

    res.json({ access_token: accessToken });
  });
}
async function logout(req, res) {
  const { refresh_token } = req.body;
  if (!refresh_token)
    return res
      .status(400)
      .json({ error: { message: "refresh token is required" } });

  const user = await user.findOne({
    where: {
      refresh_token,
    },
  });

  if (!user)
    return res
      .status(400)
      .json({ error: { message: "refresh token doesn't exist!" } });

  user.refresh_token = null;
  await user.save();

  res.status(204).json({
    message: "logout successfully!",
  });
}

export default { register, login, refresh_token, logout }