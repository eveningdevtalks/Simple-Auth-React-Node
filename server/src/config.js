require("dotenv").config();

module.exports = {
  mongoUri: process.env.MONGO_URI,
  secret: process.env.SECRET,
  port: process.env.PORT || 4041,
  tokenExpiresIn: process.env.TOKEN_EXPIRES_IN || "1minute",
  refreshTokenExpiresInDays: process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 1,
};
