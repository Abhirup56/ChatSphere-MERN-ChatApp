import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initstate = Cookies.get("jwt") || localStorage.getItem("messenger");
  const [authuser, setAuthUser] = useState(
    initstate ? JSON.parse(initstate) : null // ✅ Use `null` instead of `undefined`
  );

  useEffect(() => {
    console.log();
  }, [authuser]);

  return (
    <AuthContext.Provider value={{ authuser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
