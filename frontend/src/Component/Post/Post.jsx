import React, { useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const Post = ({
  postId,
  caption,
  postImage,
  like = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {

    const [liked ,setLiked] = useState(false);

    const handleLike = () =>{
        setLiked(!liked)
    }

  return (
    <div className="post">
      <div className="postHeader"></div>
      <img src={postImage} alt="post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography style={{ alignSelf: "center" }}>{caption}</Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
      >
        <Typography>5 Likes</Typography>
      </button>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {
            liked ? <FavoriteIcon style = {{color : "rgba(199, 45, 45, 0.911)"}}/> :<FavoriteBorderIcon />
          }
        </Button>
        <Button>
          <ChatBubbleOutlineIcon />
        </Button>
        <Button>
          {
            isDelete ? <DeleteOutlineIcon />: null 
          }
        </Button>
      </div>
    </div>
  );
};

export default Post;
