import React, { useContext, useEffect, useState } from "react";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";
import "../styles/Nav.css";

const Nav = ({ topics, setTopics }) => {
  const { isLoggedIn, setUser, user } = useContext(UserContext);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <nav className="Nav">
      <Link to="/articles/trending">
        <h3>...trending</h3>
      </Link>
      {topics.map((topic, index) => {
        return (
          <Link key={index} to={`/articles/${topic.slug}`}>
            <h4 className="Nav__topics">{topic.slug}</h4>
          </Link>
        );
      })}
      {isLoggedIn ? (
        <>
          <Link to="/logout">
            <button
              onClick={() => {
                setUser(null);
              }}
            >
              Log Out
            </button>{" "}
          </Link>
          <Link to="/articles/user">
            <button>
              <img
                className="Article__userImage"
                src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2020/05/01/08/avatar-sigourney-weaver.jpg"
                alt="user image"
              />
            </button>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <button>Log In</button>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
