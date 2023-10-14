import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AddCircle';

const Header = () => {
  return (
    <div className="header">
      <Link>
        <AddIcon />
      </Link>
    </div>
  );
};

export default Header;
