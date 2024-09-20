import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const WelcomeMessage = () => {
  const { authState } = useContext(AuthContext);
  const [message, setMessage] = useState("Please log in for all features");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (authState.isAuthenticated && authState.user) {
        setMessage(`Have fun in paradise, ${authState.user.username}!`);
      } else {
        setMessage("Please log in for all features");
      }
    }, 0); // if there needs to be a wait

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [authState]);

  return (
    <div className="welcome-message">
      {message}
    </div>
  );
};

export default WelcomeMessage;
