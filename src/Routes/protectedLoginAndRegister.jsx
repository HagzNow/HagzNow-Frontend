import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedLoginAndRegister({ children }) {
  let { user } = useContext(authContext);

  return <div>{!user ? children : <Navigate to={"/home"} />}</div>;
}
