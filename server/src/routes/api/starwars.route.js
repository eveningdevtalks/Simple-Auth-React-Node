const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

router.get("/quote", auth(), (req, res, next) => {
    const messages = [
        'Your focus determines your reality ☄️ – Qui-Gon Jinn',
        'Do. Or do not. There is no try ⚡️ - Yoda',
        'In my experience there is no such thing as luck 🔥 - Obi-Wan Kenobi',
        'I find your lack of faith disturbing 🪐 - Darth Vader',
        'It’s a trap! - Admiral Ackbar 🍁',
        'So this is how liberty dies…with thunderous applause 🌌 - Padmé Amidala',
        'Your eyes can deceive you. Don’t trust them 🌊 - Obi-Wan Kenobi'
    ]

    res.json({
        message: messages[Math.floor(Math.random() * messages.length)],
    });
});

module.exports = router;
