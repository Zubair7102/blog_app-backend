const express = require("express");
const router = express.Router();
// express.Router() is a function in Express.js that creates a new "mini" router or a modular, mountable route handler. Think of it like a mini version of the main Express app, designed to handle a specific group of routes.

// IMPORT THE CONTROLLER
const {likePost} = require("../controllers/likeController")
const {createComment} = require("../controllers/CommentController");
const {createPost, getAllPosts} = require("../controllers/PostController");


// Mapping Create

router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);
router.post("/likes/like", likePost);


// export
module.exports = router;