import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Authentication = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Authentication;