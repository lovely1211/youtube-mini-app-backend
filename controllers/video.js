const axios = require("axios");

//  Get video details from YouTube API
exports.getVideo = async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
            params: {
                part: "snippet",
                id: videoId,
                key: process.env.YOUTUBE_API_KEY, 
            }
        });

        if (!response.data.items.length) {
            return res.status(404).json({ message: "Video not found" });
        }

        const videoData = response.data.items[0].snippet;
        res.json({
            videoId,
            title: videoData.title,
            description: videoData.description,
            publishedAt: videoData.publishedAt
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//  Update Video Title via YouTube API
exports.updateVideoTitle = async (req, res) => {
    
    console.log("Session User:", req.user);
    console.log(req.body);
    
    try {
        
        if (!req.user) {
            return res.status(401).json({ message: "No user session found, please login again" });
        }

        if (!req.user.accessToken) {
            return res.status(401).json({ message: "No access token found, please login again" });
        }

        const { accessToken } = req.user;
        const videoId = req.params.videoId;
        const newTitle = req.body.title;

        const response = await axios.put(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet`,
            {
                id: videoId,
                snippet: { title: newTitle }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ message: "Title updated successfully", data: response.data });
        console.log(response.data)
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }
};

