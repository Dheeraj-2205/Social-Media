import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import {useDispatch} from "react-redux"
import { loginUser } from "../../Actions/User";
const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch();

    const loginHandler = (e) =>{
        e.preventDefault();
        dispatch(loginUser(email,password))
    }
  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3">Login</Typography>

        <input type="email" placeholder="Enter Your Email" value={email}  onChange={e =>setEmail(e.target.value)} required/>
        <input type="password" placeholder="Enter Your Password" value={password} onChange={e =>setPassword(e.target.value)} required/>

        <Link to="/forgot/password">

          <Typography>Forgot Password</Typography>
        </Link>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
