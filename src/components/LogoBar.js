import React from "react";
import logo from "../assets/logo.png";

function LogoBar() {
  return (
    <div name="logoDiv" className=" w-[100%] bg-white  p-[10px] sticky top-0 z-10 ">
      <img className="h-[35px]" src={logo} alt="AlmaBetterLogo" />
    </div>
  );
}

export default LogoBar;
