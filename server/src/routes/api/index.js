const express = require("express");
const router = express.Router();

const authRouter = require("./auth.route");
const starwarsRouter = require('./starwars.route')

router.use("/auth", authRouter);
router.use("/starwars", starwarsRouter)

module.exports = router;
