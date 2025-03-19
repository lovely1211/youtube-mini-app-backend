const express = require("express");
const passport = require("passport");
const router = express.Router();

// **Login Route**
router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email", "https://www.googleapis.com/auth/youtube.force-ssl"],
        accessType: "offline",
        prompt: "consent",
    })
);

// **Google Callback Route **
router.get(
    "/auth/callback",
    passport.authenticate("google", { failureRedirect: "/", failureFlash: true }),
    (req, res) => {
      if (!req.user) {
        console.log("User authentication failed");
        return res.redirect("/?error=authentication_failed");
      }

      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.redirect("/?error=session_save_failed");
        }
        res.redirect(`http://localhost:3000/auth?authToken=${req.user.accessToken}`);
      });
    }
);
  
// **Logout Route**
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
});

module.exports = router;
