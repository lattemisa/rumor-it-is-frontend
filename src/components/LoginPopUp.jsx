import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/User";
import "../styles/LoginPopUp.css";

const LoginPopUp = () => {
  const { user, setUser, isLoggedIn, login } = useContext(UserContext);
  const [newUser, setNewUser] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setUser(newUser);
    login(newUser);
    setNewUser("");
  };
  return (
    <div>
      {isLoggedIn === false && (
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Enter your username..."
            onChange={(e) => {
              setNewUser(e.target.value);
            }}
          />
          <button className="LoginPopUp__button" type="submit">
            Login
          </button>
        </form>
      )}
      {isLoggedIn && <Redirect to="/articles/user"></Redirect>}
    </div>
  );
};

export default LoginPopUp;
