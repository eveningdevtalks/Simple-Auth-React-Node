const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const config = require("../config");
const httpStatus = require("http-status");

module.exports = () => async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' }).end()
    }

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" && !token) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' }).end()
    }

    const decodedJwt = jwt.verify(token, config.secret);
    if (!decodedJwt) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' }).end()
    }

    // find user in db
    const { _id } = decodedJwt;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' }).end()
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
