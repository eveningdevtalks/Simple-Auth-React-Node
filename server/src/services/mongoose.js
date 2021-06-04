"use strict";

const config = require("../config");
const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(1);
});

exports.connect = () => {
  mongoose.set("debug", true);
  mongoose.connect(config.mongoUri, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};
