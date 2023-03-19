import React, { useState } from "react";
import { GoogleOAuthProvider, googleLogout } from '@react-oauth/google';

const client_id = "572348176466-51fd22tl7u7gcp26b0bcmrhj0rh08g3f.apps.googleusercontent.com"; // replace with your client ID
const redirect_uri = "http://localhost:3000"; // replace with your redirect URI

function Logout() { 
  const [currentUser, setCurrentUser] = useState(null);

  const onSuccess = () => {
    setCurrentUser(null);
  };

  return (
    <GoogleOAuthProvider client_id={client_id} redirectUri={redirect_uri}>
      {currentUser ? (
        <div>
          <p>Logged in as {currentUser.name}</p>
          <googleLogout
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
          />
        </div>
      ) : (
        <p>You are not logged in</p>
      )}
    </GoogleOAuthProvider>
  );
}

export default Logout;
