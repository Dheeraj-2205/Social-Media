import React from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
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
      <button className="like-button">
        <Typography>5 Likes</Typography>
      </button>
    </div>
  );
};

export default Post;
