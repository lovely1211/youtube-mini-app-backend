require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
require("./config/passport"); 

// Import Routes
const authRoutes = require("./routes/auth")
const videoRoutes = require("./routes/video");
const commentRoutes = require("./routes/comment");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:3000", 
      credentials: true, 
    })
);

// Session Setup 
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, 
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// Connect Database
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
