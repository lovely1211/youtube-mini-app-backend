const express = require("express");
const { getVideo, updateVideoTitle } = require("../controllers/video");
const router = express.Router();

router.get("/:videoId", getVideo);
router.put("/:videoId", updateVideoTitle);

module.exports = router;
