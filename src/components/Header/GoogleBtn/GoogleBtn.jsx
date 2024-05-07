import React from "react";
import "./GoogleBtn.css";

function GoogleBtn({onClick}) {
  return (
    <div onClick={onClick} className="googleButton">
      Login com Google
    </div>
  );
}

export default GoogleBtn;
