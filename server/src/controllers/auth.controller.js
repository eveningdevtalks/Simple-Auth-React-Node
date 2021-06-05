const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const config = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const RefreshToken = require("../models/refreshToken.model");

exports.register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    const existingAcc = await User.findOne({ email });
    if (existingAcc) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: `Account already exists for ${email}` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    return res.status(httpStatus.CREATED).json({ message: "Ok" });
  } catch (error) {
    next(error);
  }
};

function addDays(days) {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return now;
}

async function generateRefreshToken(userId) {
  const refreshToken = await RefreshToken.findOne({ user: userId });

  if (!refreshToken) {
    const expiresAt = addDays(config.refreshTokenExpiresInDays);
    const token = crypto.randomBytes(128).toString("hex");
    const newToken = new RefreshToken({
      token,
      user: userId,
      expiresAt,
    });
    await newToken.save();

    return token;
  }

  refreshToken.expiresAt = addDays(config.refreshTokenExpiresInDays);
  await refreshToken.save();

  return refreshToken.token;
}

async function generateTokens(userId) {
  const refreshToken = await generateRefreshToken(userId);

  const jwtPayload = { _id: userId };
  const accessToken = jwt.sign(jwtPayload, config.secret, {
    expiresIn: config.tokenExpiresIn,
  });

  return {
    accessToken,
    refreshToken,
  };
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Email or Password invalid" });
    }

    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Email or Password invalid" });
    }

    const tokens = await generateTokens(user._id.toString());

    return res
      .status(httpStatus.OK)
      .json({ ...tokens, user: { name: user.name } });
  } catch (error) {
    next(error);
  }
};

exports.loginToken = async (req, res, next) => {
  try {
    const { token } = req.body;

    const refreshToken = await RefreshToken.findOne({ token }).populate("user");
    if (!refreshToken) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const { user } = refreshToken;
    const tokens = await generateTokens(user._id.toString());

    return res
      .status(httpStatus.OK)
      .json({ ...tokens, user: { name: user.name } });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { user } = req;

    await RefreshToken.deleteOne({ user: user._id });

    return res.status(httpStatus.OK).json({ message: "Ok" });
  } catch (error) {
    next(error);
  }
};

exports.renewRefreshToken = async (req, res, next) => {
  try {
    const { user } = req;

    const refreshToken = await RefreshToken.findOne({ user: user._id });
    if (!refreshToken) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    refreshToken.expiresAt = addDays(config.refreshTokenExpiresInDays);
    await refreshToken.save();

    return res.status(httpStatus.OK).json({ message: "Ok" });
  } catch (error) {
    next(error);
  }
};
