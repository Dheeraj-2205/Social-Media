const express = require("express");
const {createPost} =require("../controllers/post");
const {isAuthenticated,likeAndUnlikePost} = require("../middlewares/auth")
const router = express.Router();


router.route("/post/upload").post(isAuthenticated,createPost);
router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost);

module.exports = router;