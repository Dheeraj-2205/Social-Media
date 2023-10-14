import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import Home from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const Header = () => {
    const [tab,setTab] = useState(window.location.pathname);
    console.log(tab);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {
            tab === "/" ? <Home /> : <HomeOutlinedIcon/>
        }
      </Link>
      <Link to="/newpost"  onClick={() => setTab("/newpost")}>
        {
            tab === "/newpost" ? <Add /> : <AddOutlinedIcon/>
        }
      </Link>
      <Link to="/search"  onClick={() => setTab("/search")}>
        {

            tab === "/search" ? <Search /> : <SearchOutlinedIcon/>
        }
      </Link>
      <Link to="/account"  onClick={() => setTab("/account")}>

        {
            tab === "/account" ? <AccountCircleIcon /> : <AccountCircleOutlinedIcon/>
        }
      </Link>
    </div>
  );
};

export default Header;
