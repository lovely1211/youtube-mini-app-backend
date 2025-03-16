const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    publishedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
