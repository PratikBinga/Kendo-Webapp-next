// pages/_app.tsx
import React, { useEffect, useState } from "react";
import userManager from "../AuthService";

function MyApp({ Component, pageProps }: any) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    userManager?.getUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <p>Hi Welcome, {user.profile.name}</p>
          <a href="/logout">Logout</a>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
