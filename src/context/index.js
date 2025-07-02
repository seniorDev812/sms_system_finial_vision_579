import React, { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext({});

const Provider = ({ children }) => {
  const [auth, setAuth] = useState({
    jwtToken: "",
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem("jwtToken");
      setAuth({
        jwtToken: token,
      });
    } catch (error) {
      setAuth({
        jwtToken: "",
      });
      console.log("error", error.message);
    }
  }, []);

  return (
    <GlobalContext.Provider
     value={{ auth, setAuth }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Provider;
