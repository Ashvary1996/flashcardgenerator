import React from "react";

import logo from "../assets/logo.png";
function LogoBar() {
  const darkMode = () => {
    console.log("clicked");
  };
  return (
    <div  name="logoDiv"  className="w-[100%] bg-white p-[10px] sticky top-0 z-10 flex m-auto "  >
      <img className="h-[35px] text-left" src={logo} alt="AlmaBetterLogo" /> 
      <button className="text-right  flex-1 mr-10 text-sm" onClick={darkMode}> ☀ Dark Mode </button>  ☾
    </div>
  );
}

export default LogoBar;
