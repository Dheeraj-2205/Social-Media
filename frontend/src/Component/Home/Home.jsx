import React from "react";
import User from "../User/User";
import "./Home.css";
import Post from "../Post/Post";

const Home = () => {
  return (
    <div className="home">
      <div className="homeleft">
        <Post/>
      </div>
      <div className="homeright">
        <User
          userId  = {"user._id"}
          name = {'user.name'}
          avatar = {'user.avatar.url'}
        />
      </div>
    </div>
  );
};

export default Home;
