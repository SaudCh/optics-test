import React from "react";
import Logo from "../images/logo.png";

import "./spinner.css";

//loading sipnner
const LoadingSpinner = (props) => {
    return (
        <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
            <div className="text-center">
                <img src={Logo} alt="Logo" width={100} className="logo" />
                <br />
                <br />
                <div className="lds-dual-ring"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;