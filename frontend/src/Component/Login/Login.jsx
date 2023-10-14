import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const Login = () => {
  return (
    <div className="login">
      <form className="loginForm">
        <Typography variant="h3">Login</Typography>
        <input type="email" placeholder="Enter Your Email" />
        <input type="password" placeholder="Enter Your Password"/>
        <Link to="/forgot/password">
          <Typography>Forgot Password</Typography>
        </Link>
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
