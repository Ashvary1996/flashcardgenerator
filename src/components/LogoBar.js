import React from "react";
import logo from "../assets/logo.png";

function LogoBar() {
  return (
    <div className=" h-8 py-8 bg-[#ffffff] border-b-4 border-[#f0edeb]">
      <img className="w-32 -my-4 mx-8" src={logo} alt="AlmaBetterLogo" />
    </div>
  );
}

export default LogoBar;
