import React, { useContext, useEffect } from "react";
import { getTopics } from "../utils/api";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";
import "../styles/Nav.css";

const Nav = ({ topics, setTopics }) => {
  const { isLoggedIn, setUser, logout } = useContext(UserContext);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <nav className="Nav">
      <Link to="/articles/trending" className="Nav__topics">
        <h3>...trending</h3>
      </Link>
      {topics.map((topic, index) => {
        return (
          <Link
            key={index}
            to={`/articles/${topic.slug}`}
            className="Nav__topics"
          >
            <h4 className="Nav__topics">{topic.slug}</h4>
          </Link>
        );
      })}
      {isLoggedIn ? (
        <>
          <Link to="/logout">
            <button
              className="Nav__buttons"
              onClick={() => {
                setUser(null);
                logout();
              }}
            >
              Log Out
            </button>{" "}
          </Link>
          <Link to="/articles/user">
            <button className="Nav__buttons">
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
          <button className="Nav__buttons">Log In</button>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
