// src/components/WelcomeMessage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"; // Import UserContext

const WelcomeMessage = () => {
  const { authState } = useContext(AuthContext);
  console.log(authState)
  let loginActions = (<></>)
  if (authState) {
    loginActions = (
      <div className="welcome-message">Have fun in paradise, {authState.user.username}!</div>
    );
  }
  return (
   <> {loginActions}</>
  )
};

export default WelcomeMessage;
