// pages/login.tsx
import React from "react";
import userManager from "../AuthService";

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    userManager?.signinRedirect(); // Redirect to Auth0 for login
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
