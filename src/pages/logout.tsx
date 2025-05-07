// pages/logout.tsx
import { useEffect } from "react";
import userManager from "../AuthService";

const LogoutPage: React.FC = () => {
  useEffect(() => {
    userManager
      .signoutRedirect()
      .then(() => {
        window.location.href = "/"; // Redirect after logout
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  }, []);

  return <div>Logging out...</div>;
};

export default LogoutPage;
