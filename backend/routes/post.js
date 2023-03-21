const express = require("express");
const {createPost,likeAndUnlikePost,deletePost, updateCaption} =require("../controllers/post");
const { getPostOfFollowing } = require("../controllers/user");
const {isAuthenticated} = require("../middlewares/auth")
const router = express.Router();


router.route("/post/upload").post(isAuthenticated,createPost);

router
    .route("/post/:id")
    .get(isAuthenticated,likeAndUnlikePost)
    .put(isAuthenticated,updateCaption)
    .delete(isAuthenticated,deletePost);
    
router.route("/posts").get(isAuthenticated,getPostOfFollowing)
module.exports = router;