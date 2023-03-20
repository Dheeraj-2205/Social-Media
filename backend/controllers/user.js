const Post = require("../models/Post");
const User = require ("../models/User");
exports.register = async(req,res)=>{
    try {
        
        const {name ,email, password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res
            .status(400)
            .json({
                success : false,
                message : "User already exists"
            })
        }
        user = await User.create({
            name,
            email,
            password,
            avatar: {public_id : "sample_id", url : "sampleurl"}
        })

        const token = await user.generateToken();
        
        const options = {
            expires : new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        
        res.status(201)
        .cookie("token", token, options)
        .json({
            success : true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.login = async (req,res) =>{
    try {
        const {email ,password} = req.body;
        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success : false,
                message : "User does not exists"
            })
        }
        const isMatch = await user.matchPassword(password);
        
        if(!isMatch){
            return res.status(400).json({
                success : false,
                message : "Incorrect password"
            })
        }
        
        const token = await user.generateToken();
        
        const options = {
            expires : new Date(Date.now()+ 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }


        res.status(200)
        .cookie("token", token, options)
        .json({
            success : true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.logout = async(req,res)=>{
    try {
        res.status(200).cookie("token", null, {expires: new Date(Date.now()), httpOnly :true})
        .json({
            success : true,
            message : "Logged out"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.followUser = async(req,res)=>{
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);
        if(!userToFollow){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }

        if(loggedInUser.following.includes(userToFollow._id)){
            const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
            const indexfollowers = userToFollow.following.indexOf(loggedInUser._id);

            loggedInUser.following.splice(indexfollowing,1);
            userToFollow.follower.splice(indexfollowers,1);
            
            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                sucess : true,
                message : "User unfollowed"
            })
        }else{

            loggedInUser.following.push(userToFollow._id);
            userToFollow.follower.push(loggedInUser._id);

            await loggedInUser.save();
            await userToFollow.save();

            res.status(200).json({
                success : true,
                message : "User followed"
            })
        }

    } catch (error) {
        res.status(500).json({
            success : "false",
            message : error.message
        })
    }
}

exports.getPostOfFollowing = async(req,res)=>{
    try {

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner :{
                $in : user.following
            }
        }) 
        
        
        res.status(200).json({
            success : true,
            posts,
        })

        
    } catch (error) {
        res.status(500).json({
            success : "false",
            message : error.message
        })
    }
}

exports.updatePassword = async (req,res)=>{
    try {
        const user= await User.findById(req.user._id);

        const {oldPassword , newPassword} = req.body;

        const isMatch = await user.matchPassword(oldPassword);

        if(!isMatch){
            return res.status(400).json({
                success : false,
                message: "Incorrect Old Password"
            })
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({
            success : true,
            messae : "password upadated"
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            messae : error.message
        })
    }
}