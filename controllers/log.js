const Log = require("../models/logs");

//  Create log entry when an event happens
exports.createLog = async (event, videoId, details) => {
    try {
        const log = new Log({
            event,
            videoId,
            timestamp: new Date(),
            details
        });
        await log.save();
    } catch (err) {
        console.error("Error saving log:", err);
    }
};
