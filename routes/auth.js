const express = require("express");
const passport = require("passport");
const router = express.Router();

// **Login Route**
router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email", "https://www.googleapis.com/auth/youtube.force-ssl"],
    })
);

// **Callback Route**
router.get(
    "/auth/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

// **Logout Route **
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
});

module.exports = router;
