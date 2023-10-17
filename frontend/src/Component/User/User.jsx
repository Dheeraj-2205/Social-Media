import React from 'react'
import "../Home/Home.css"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const User = ({userId,name, avatar}) => {
    console.log(userId);
  return (
    <Link to = {`/user/${userId}`} className = "homeUser">
        <img src={avatar} alt={name} />
        <Typography>{name}</Typography>
    </Link>
  )
}

export default User