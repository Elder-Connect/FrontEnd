import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Router from "./Router";
import auth from "./services/auth";
export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);

  // Google Auth
  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const userData = await auth(accessToken);
        setUser(userData);
      }
    };

    fetchUserData();
  },[]);

  return (
    <div className="App">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Router />
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
