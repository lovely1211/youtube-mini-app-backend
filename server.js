require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
require("./config/passport");

const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/video");
const commentRoutes = require("./routes/comment");

const app = express();
const PORT = process.env.PORT || 5000;

// **CORS Configuration**
app.use(
    cors({
        origin: "https://youtube-mini-app-frontend.vercel.app", 
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

// **Session Configuration**
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { 
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "none",
        },
    })
);

// **Initialize Passport**
app.use(passport.initialize());
app.use(passport.session());

// **Routes**
app.use("/api", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// **Connect to Database**
connectDB();

// **Start Server**
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
