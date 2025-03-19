const express = require("express");
const passport = require("passport");
const { getVideo, updateVideoTitle } = require("../controllers/video");
const router = express.Router();

router.get("/:videoId", getVideo);
router.put("/:videoId", 
    passport.authenticate("google", {
        scope: ["profile", "email", "https://www.googleapis.com/auth/youtube.force-ssl"],
    }),
    updateVideoTitle
);

module.exports = router;
