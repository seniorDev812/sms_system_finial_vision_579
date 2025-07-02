import { useContext } from "react";
import authService from "../service/auth.js";
import { GlobalContext } from "../context/index.js";

export function useAuth() {
    const {auth, setAuth} = useContext(GlobalContext)

  const setAuthentication = (jwtToken) => {
    try {
      localStorage.setItem("jwtToken", JSON.stringify(jwtToken));
      setAuth({
        jwtToken
      })
    } catch (error) {
      localStorage.removeItem("jwtToken", "");
      console.log("error", error.message);
    }
  };

  const login = async (userData) => {
    return await authService.login(userData);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return { login, logout, setAuthentication };
}
