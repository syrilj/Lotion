import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "../index.css";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const [user, setUser] = useState(null);
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

        const { email } = res.data;
        props.onLogin(email);
        localStorage.setItem("token", response.access_token);
        setUser({ email });
        // set the isLoggedIn value to true when the user logs in
        window.localStorage.setItem("isLoggedInUser", true);
        navigate("/notes"); // navigate to the notes page
      } catch (err) {
        console.log(err);
      }
    },
  });
  
  return (
    <div className="LoginPage">
      <header className="LoginPage-header">
        {user ? (
          <div>
            <p>Welcome, {user.email}!</p>
          </div>
        ) : (
          <button className="button-login" onClick={login}>
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
              alt="Google logo"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            Sign in with Google
          </button>
        )}
      </header>
    </div>
  );
}

export default LoginPage;
