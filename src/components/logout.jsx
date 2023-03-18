import React from "react";
import { GoogleLogout } from 'react-google-login';
const client_id = "572348176466-51fd22tl7u7gcp26b0bcmrhj0rh08g3f.apps.googleusercontent.com";
function LogOut(){ 
  const onSuccess = (res) => {
    console.log('[Log out Success] currentUser:', res.profileObj);
  };
  return(
    <div id = "signInButton">
      <GoogleLogout
        clientId={client_id}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
        />
    </div>
  );
}

export default LogOut;