// src/authservice/AuthService.ts
import { UserManager, WebStorageStateStore } from "oidc-client-ts";

let userManager: UserManager | null = null;
const isBrowser = typeof window !== "undefined";
if (typeof window !== "undefined") {
  const oidcConfig = {
    authority: "https://dev-bae6tq1mtamm1i71.us.auth0.com", // Your Auth0 domain
    client_id: "IVixaKCkvW4Q28U5HeFz8BJjekFy1kcJ", // Your Auth0 Client ID
    redirect_uri: "http://localhost:3000/callback", // URL after login
    post_logout_redirect_uri: "http://localhost:3000/", // URL after logout
    response_type: "code",
    scope: "openid profile email",
    userStore: isBrowser
      ? new WebStorageStateStore({ store: window.localStorage })
      : undefined,
  };

  userManager = new UserManager(oidcConfig);
}

export default userManager;
