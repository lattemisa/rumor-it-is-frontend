import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/User";
import "../styles/LoginPopUp.css";
import { getUsers } from "../utils/api";
import Error from "./Error";

const LoginPopUp = () => {
  const { setUser, isLoggedIn, login, setExistingUsers } =
    useContext(UserContext);
  const [newUser, setNewUser] = useState("");
  const [err, setError] = useState(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    getUsers().then((users) => {
      if (
        users.filter((existingUser) => {
          return existingUser.username === newUser;
        }).length > 0
      ) {
        const existingUser = users.filter((existingUser) => {
          return existingUser.username === newUser;
        });
        setExistingUsers(users);
        setUser(existingUser[0]);
        login(newUser);
      } else {
        setError(`The username "${newUser}" does not exist.`);
      }
    });

    setNewUser("");
  };
  if (err) return <Error setError={setError} err={err} />;
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
