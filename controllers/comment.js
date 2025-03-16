const axios = require("axios");
const Comment = require("../models/comments");

//  Add Comment via YouTube API
exports.addComment = async (req, res) => {
    try {
        const { accessToken } = req.user; 
        const { videoId, text } = req.body;

        const response = await axios.post(
            `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet`,
            {
                snippet: {
                    videoId,
                    topLevelComment: {
                        snippet: {
                            textOriginal: text
                        }
                    }
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const commentId = response.data.id;
        const newComment = new Comment({ videoId, commentId, text, author: req.user.profile.displayName });
        await newComment.save();

        res.status(201).json({ message: "Comment added successfully", data: response.data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//  Delete Comment via YouTube API
exports.deleteComment = async (req, res) => {
    try {
        const { accessToken } = req.user; 
        const { commentId } = req.params;

        await axios.delete(`https://www.googleapis.com/youtube/v3/comments?id=${commentId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        await Comment.findOneAndDelete({ commentId });
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
