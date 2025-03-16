const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    commentId: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    author: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
