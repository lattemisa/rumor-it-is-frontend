import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const previousUser = localStorage.getItem("loggedInUser");
    if (previousUser) {
      setUser(previousUser);
    }
  });
  const login = (user) => {
    localStorage.setItem("loggedInUser", user);
  };
  const logout = () => {
    localStorage.removeItem("loggedInUser");
  };
  const isLoggedIn = !!user;
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
