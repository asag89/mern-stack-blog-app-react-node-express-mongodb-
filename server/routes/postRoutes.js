
const router = require("express").Router()

const protect = require("../middleware/authMiddleware")

const {
    getPost,
    getUserPosts,
    getAllPosts,
    createPost,
    deletePost } = require("../controllers/postController")

router.get("/:postId", getPost)

router.get("/user/:userId", getUserPosts)

router.post("/", protect, createPost)

router.delete("/:postId", protect, deletePost)

router.get("/", getAllPosts)

module.exports = router