import React, { useContext } from "react";
import { UserContext } from "../context/User";

const Logout = () => {
  const { isLoggedIn, setUser } = useContext(UserContext);

  return <div>{!isLoggedIn && <h2>Come back Soon</h2>}</div>;
};

export default Logout;
