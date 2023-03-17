const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
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

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password =await bcrypt.hash(this.password,10);
    }
    next();
})

userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken = function (){
JWT_SECRET = "KDFLAKJRJOREFKAKDKALFDJLFJEOIRIOW"
    return jwt.sign({_id : this._id},process.env.JWT_SECRET)
}

module.exports = mongoose.model("User",userSchema);