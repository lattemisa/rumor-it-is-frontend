import { createContext, useEffect, useState } from "react";
import { getUsers } from "../utils/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [existingUsers, setExistingUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const previousUser = localStorage.getItem("loggedInUser");
    if (previousUser) {
      getUsers().then((users) => {
        const existingUser = users.filter((existingUser) => {
          return existingUser.username === previousUser;
        });
        setExistingUsers(users);
        setUser(existingUser[0]);
      });
    }
  }, []);
  const login = (user) => {
    localStorage.setItem("loggedInUser", user);
  };
  const logout = () => {
    localStorage.removeItem("loggedInUser");
  };
  const isLoggedIn = !!user;
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        login,
        logout,
        existingUsers,
        setExistingUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
