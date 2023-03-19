import LoginButton from "../components/login";
import LogoutButton from "../components/logout";
import React from "react";
import { useEffect } from "react";
import {gapi} from 'gapi-script'


const client_id = "572348176466-51fd22tl7u7gcp26b0bcmrhj0rh08g3f.apps.googleusercontent.com";

function LoginPage(){
    useEffect(() => {
    function start() {
        gapi.client.init({
            client_id: client_id,
            scope: ""
        })
    };
        gapi.load('client:auth2', start);
        });

    return (
        <div className='LoginPage'>
            <LoginButton/>
            <LogoutButton/>
        </div>
    );
}

export default LoginPage; 