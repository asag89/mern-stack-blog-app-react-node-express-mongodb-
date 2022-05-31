
const Post = require("../models/postModel")

// get post
exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.status(200).json(post)
    }
    catch (error) {
        console.log(error)
    }
}

// create post
exports.createPost = async (req, res) => {
    try {
        const { text, title, category, image } = req.body

        if (!text || !title) {
            res.status(400).json("Please add a text field")
        }

        const newPost = await Post.create({
            text,
            title,
            category,
            image,
            user: req.user.id,
            username: req.user.username,
            userPhoto: req.user.userPhoto       //! don't forget here after adding user image
        })
        res.status(201).json(newPost)
    }
    catch (error) {
        console.log(error)
    }
}

// delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)

        if (!post) {
            res.status(404).json("Post not found")
        }

        if (!req.user) {
            res.status(401).json("User not found")
        }

        // make sure the logged in user matches the post user
        if (post.user.toString() !== req.user.id) {
            res.status(401).json("User not authorized")
        }

        await Post.findByIdAndRemove(post.id)
        res.status(200).json(req.params.postId)
    }
    catch (error) {
        console.log(error)
    }
}

// get all post
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// get user posts
exports.getUserPosts = async (req, res) => {
    try {
        const userId = req.params.userId
        const userPost = await Post.find({ user: userId })
        res.status(200).json(userPost)
    }
    catch (error) {
        console.log(error)
    }
}