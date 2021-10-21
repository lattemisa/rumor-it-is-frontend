import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header_header">
      <Link to="/articles/trending">
        <h1>rumor</h1>
        <h1 className="Header__rumor"> it is</h1>
      </Link>
    </div>
  );
};

export default Header;
