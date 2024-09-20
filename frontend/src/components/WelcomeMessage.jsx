import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const WelcomeMessage = () => {
  const { authState } = useContext(AuthContext);
  
  // Debug
  console.log('Auth State:', authState);

  if (authState.loading) {
    return <div>Loading...</div>; // Show loading while fetching user
  }

  if (!authState.isAuthenticated || !authState.user) {
    return <div>Please log in for all features</div>;
  }

  return (
    <div className="welcome-message">
      Have fun in paradise, {authState.user.username}!
    </div>
  );
};

export default WelcomeMessage;
