

import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';

const client_id = "572348176466-51fd22tl7u7gcp26b0bcmrhj0rh08g3f.apps.googleusercontent.com"; // replace with your client ID

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (credentialResponse) => {
    // handle the credentialResponse returned by GoogleLogin
    console.log(credentialResponse);
    setLoggedIn(true);
  };

  const handleLoginError = (error) => {
    // handle login errors
    console.log(error);
    setLoggedIn(false);
  };

  return (
    <div id="signInButton">
      {!loggedIn && (
        <GoogleLogin
          client_id={client_id}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={handleLoginError}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          useOneTap
        />
      )}
      {loggedIn && (
        <div>
          <p>You are logged in!</p>
        </div>
      )}
    </div>
  );
}

export default Login;
