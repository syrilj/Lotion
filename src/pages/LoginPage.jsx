import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "../index.css";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const [user, setUser] = useState(null); // state to store user information
  const navigate = useNavigate(); // hook to navigate to a new page

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const { email } = res.data; // get the email from the response
        props.onLogin(res.data.email); // notify the parent component that the user has logged in and pass the email address as a prop

      } catch (err) {
        console.log(err);
      }
    },
  });

  if (user) {
    return (
      <div className="LoginPage">
        <header className="LoginPage-header">
          <div>
            <p>Welcome, {user.name}!</p>
            <img src={user.picture} alt={user.name} />
          </div>
        </header>
      </div>
    );
  } else {
    return (
      <div className="LoginPage">
        <header className="LoginPage-header">
        <button className="button-login" onClick={login}>
  <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png" alt="Google logo" style={{width: '20px', height: '20px', marginRight: '10px'}} />
  Sign in with Google
</button>


        </header>
      </div>
    );
  }
}

export default LoginPage;
