const express = require("express");
const { addComment, deleteComment } = require("../controllers/comment");
const router = express.Router();

router.post("/", addComment);
router.delete("/:commentId", deleteComment);

module.exports = router;
