const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.get("/quote", auth(), (req, res, next) => {
    const message = 'Do. Or do not. There is no try. - Yoda';

    res.json({
        message,
    });
});

module.exports = router;
