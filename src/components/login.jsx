import React from "react";
import { useState } from "react";
import { GoogleLogin } from 'react-google-login';
const client_id = "572348176466-51fd22tl7u7gcp26b0bcmrhj0rh08g3f.apps.googleusercontent.com";
function Login(){ 
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
  };
  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };
  return(
    <div id = "signInButton">
      <GoogleLogin
        clientId={client_id}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn = {true}
        />
    </div>
  );
}

export default Login;