const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please enter a name"],

    },
    avatar : {
        public_id : String,
        url : String
    },
    email : {
        type : String,
        required : [true, "please enter an email"],
        unique : [true, "Email already exists"],
    },
    password : {
        type : String,
        required : [true, "please enter an password"],
        minlength : [6, "Password must be at least 6 character"],
        select : false
    },
    posts :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ],
    follower :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    following :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
})

module.exports = mongoose.model("User",userSchema);