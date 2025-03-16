const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    event: { type: String, required: true },
    videoId: { type: String },
    timestamp: { type: Date, default: Date.now },
    details: { type: Object }
});

module.exports = mongoose.model('Log', logSchema);
