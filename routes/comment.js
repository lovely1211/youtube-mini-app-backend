const express = require("express");
const passport = require('passport');
const { addComment, deleteComment } = require("../controllers/comment");
const router = express.Router();

router.post("/", 
    passport.authenticate("google", {
        scope: ["profile", "email", "https://www.googleapis.com/auth/youtube.force-ssl"],
    }), 
    addComment);

router.delete("/:commentId", deleteComment);

module.exports = router;
