const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const config = require("../config");
const httpStatus = require("http-status");

module.exports = () => async (req, _res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res.status(httpStatus.UNAUTHORIZED)
      throw Error("Unauthorized");
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" && !token) {
      res.status(httpStatus.UNAUTHORIZED)
      throw Error("Unauthorized");
    }

    const decodedJwt = jwt.verify(token, config.secret);
    if (!decodedJwt) {
      res.status(httpStatus.UNAUTHORIZED)
      throw Error("Unauthorized");
    }

    // find user in db
    const { _id } = decodedJwt;
    const user = await User.findById(_id);
    if (!user) {
      res.status(httpStatus.UNAUTHORIZED)
      throw Error("Unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
