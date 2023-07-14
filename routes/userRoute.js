const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/controller");
const { displayProfile, userFollower, userUnFollower, uploadProfilePic, searchUser } = require("../controllers/userController");
const protect = require("../Middleware/authMiddleware");


// Authentication Routes
router.post("/signup", signUp) 
router.post("/signin", signIn)

// user Profile 

router.get("/search", searchUser)
router.get("/profile/:id", displayProfile)
router.put("/follow", protect, userFollower)
router.put("/unfollow", protect, userUnFollower)
router.put("/uploadprofilepic", protect, uploadProfilePic)
      


module.exports = router;