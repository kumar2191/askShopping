import React from "react";
import SignButton from "./SignButton";
import LoginButton from "./LoginButton";

function LogLogout(){
    if (!localStorage.usertoken) {
      return <SignButton />;
    } else {
      return <LoginButton />;
    }
}

export default LogLogout;
