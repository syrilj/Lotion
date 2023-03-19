import React, { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginButton from "../components/login";
import LogoutButton from "../components/logout";
import { Helmet } from 'react-helmet';

const client_id = '572348176466-51fd22tl7u7gcp26b0bcmrhj0rh08g3f.apps.googleusercontent.com'; // replace with your client ID
const redirect_uri = "http://localhost:3000"; // replace with your redirect URI

function LoginPage() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    setCurrentUser(credentialResponse);
  };

  const handleLogoutSuccess = () => {
    setCurrentUser(null);
  };

  return (
    <div className='LoginPage'>
        <Helmet>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Helmet>
      <GoogleOAuthProvider client_id={client_id} redirectUri={redirect_uri}>
        {currentUser ? (
          <div>
            <p>Welcome, {currentUser.profile.name}!</p>
            <LogoutButton onSuccess={handleLogoutSuccess} />
          </div>
        ) : (
          <LoginButton onSuccess={handleLoginSuccess} />
        )}
      </GoogleOAuthProvider>
    </div>
  );
}


export default LoginPage;
