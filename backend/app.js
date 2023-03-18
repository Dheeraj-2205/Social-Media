const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path : "backend/config/config.env"});
}
// using middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())


// importing  routes
const post = require("./routes/post")
const user = require("./routes/user");
const { isAuthenticated } = require("./middlewares/auth");
const { likeAndUnlikePost } = require("./controllers/post");


// using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);


module.exports = app;