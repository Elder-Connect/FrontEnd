import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import Loading from "../components/Loading/Loading";

const Authentication = ({ children, userType }) => {
  const { user } = useContext(UserContext);

  if (user === undefined) {
    <Loading />
  }

  if (!user || user === null) {
    return <Navigate to="/" />;
  }

  if(userType && localStorage.getItem("userType") != userType){
    return <Navigate to="/" />;
  }

  return children;
};

export default Authentication;
