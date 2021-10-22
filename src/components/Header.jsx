import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header_header">
      <Link to="/articles/trending" className="Nav__topics">
        <h1>
          rumor <span className="Header__rumor">it is</span>
        </h1>
      </Link>
    </div>
  );
};

export default Header;
