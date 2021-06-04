const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

const config = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    return res
      .status(httpStatus.CREATED)
      .json({ message: 'Ok' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Email or Password invalid' });
    }

    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Email or Password invalid' });
    }

    const jwtPayload = { _id: user._id.toString() };

    const accessToken = jwt.sign(jwtPayload, config.secret, {
      expiresIn: config.tokenExpiresIn,
    });

    return res.status(httpStatus.OK).json({ accessToken, user: { name: user.name } });
  } catch (error) {
    next(error);
  }
};
