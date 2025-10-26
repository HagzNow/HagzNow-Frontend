import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export let authContext = createContext(null);

export default function AuthContextProvider({ children }) {
  let [role, setRole] = useState(null);
  let [token, setToken] = useState(localStorage.getItem("token"));

  function decodeToken(token) {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded);
        console.log(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        setRole(null);
      }
    }
  }

  useEffect(() => {
    decodeToken(token);
  }, [token]);

  return (
    <div>
      <authContext.Provider value={{ role, token, setToken, decodeToken }}>
        {children}
      </authContext.Provider>
    </div>
  );
}
