const express = require("express");
const protect = require("../Middleware/authMiddleware");
const { createPost, allPosts, myPosts, userLikes, userUnLikes, userComment, deletePost, followingPost } = require("../controllers/postController");

const router = express.Router()

router.post("/createpost", protect, createPost)
router.get("/allposts", allPosts)
router.get("/myposts", protect, myPosts)
router.put("/like", protect, userLikes)
router.put("/unlike", protect, userUnLikes)
router.put("/comment", protect, userComment)
router.delete("/delete/:postId", protect, deletePost)
router.get("/followingpost", protect, followingPost)



module.exports = router;