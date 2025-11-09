import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  let [user, setUser] = useState(null);
  let [token, setToken] = useState(localStorage.getItem("token"));

  function decodeToken(token) {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  useEffect(() => {
    if (token) decodeToken(token);
  }, [token]);

  return (
    <authContext.Provider
      value={{ user,setUser, token, setToken, decodeToken, logout }}
    >
      {children}
    </authContext.Provider>
  );
}

