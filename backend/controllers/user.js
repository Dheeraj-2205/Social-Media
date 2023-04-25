const Post = require("../models/Post");
const User = require("../models/User");
const {sendEmail} = require("../middlewares/sendEmail") 
const crypto = require("crypto");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "sample_id", url: "sampleurl" },
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexfollowers = userToFollow.following.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexfollowing, 1);
      userToFollow.follower.splice(indexfollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        sucess: true,
        message: "User unfollowed",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.follower.push(loggedInUser._id);

      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        success: true,
        message: "User followed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

exports.getPostOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide oldPassword and newPassword",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old Password",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      messae: "password upadated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messae: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      sucesss: false,
      message: error.message,
    });
  }
};

exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.follower;
    const userId = user._id;
    const following = user.following;

    await user.deleteOne();

    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
    });

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await post.deleteOne();
    }

    // remove user from followers following
    for(let i = 0; i < followers.length; i++){
        const follower = await User.findById(followers[i]);
        const index = follower.following.indexOf(userId);
        follower.following.splice(index,1);
        await follower.save();
    }

    // removing user form following's followers
    for(let i = 0; i < following.length; i++){
        const follows = await User.findById(following[i]);
        const index = follows.follower.indexOf(userId);
        follows.follower.splice(index,1);
        await follows.save();
    }

    res.status(401).json({
      sucess: true,
      message: "please login",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.myProfile = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate("posts");

        res.status(200).json({
            sucess : true,
            user,
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.getUserProfile = async(req,res) =>{
    try {
        const user = await User.findById(req.params.id).populate("posts");

        if(!user){
            return res.status(404).json({
                success : true,
                message : "User not found"
            })
        }
        res.status(200).json({
            success : true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

exports.getAllUser = async (req,res)=>{
    try {
        const user = await User.find({});
        res.status(200).json({
            success : true,
            user,
        })

        
    } catch (error) {
        res.status(500).json({
            success : true,
            message : error.message
        })
    }
}

exports.forgotPassword = async (req,res) =>{
  try {
    const user = await User.findOne({email : req.body.email});

    if(!user){
      return res.status(404).json({
        success : false,
        message : "There is something wrong user not found"
      })
    }
    const resetPasswordToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`
    const message = `Reset your password by clicking on this link below : \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email : user.email,
        subject : "Reset Password",
        message, 
      })
      res.status(200).json({
        success : true,
        message : `Email sent to ${user.email}`
      })
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      res.status(500).json({
        success : false,
        
      })
    }
  } catch (error) {
     return res.status(500).json({
      success : false,
      message : error.message 
     })
  }
}
 
exports.resetPassword =async (req,res)=>{
  try {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest()
  } catch (error) {
    res.status(500).json({
      success : false,
      message : error.message
    })
  }
}