import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const Authentication = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user === undefined) {
    //TODO Loading component
    return <div style={{display: 'flex', placeContent: 'center', height: '50vh'}}>
            <img src="https://thebowlcut.com/cdn/shop/t/41/assets/loading.gif?v=157493769327766696621701744369" alt="loading gif" />
          </div>;
  }

  if (!user || user === null) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Authentication;
