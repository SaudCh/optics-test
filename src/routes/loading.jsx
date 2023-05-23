import React from "react";
import Logo from "../images/logo.png";

export default function Loading() {
  return (
    <div className="loader">
      <div>
        <img src={Logo} style={{ width: 150 }} alt="logo" />
      </div>
    </div>
  );
}
