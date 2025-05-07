// src/pages/callback.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import userManager from "../AuthService";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        await userManager?.signinRedirectCallback();
        router.replace("/"); // Redirect to home after successful login
      } catch (error) {
        console.error("Error handling redirect callback:", error);
      }
    };

    // Only run on client
    if (typeof window !== "undefined") {
      handleRedirect();
    }
  }, []);

  return <p>Signing you in...</p>;
}
