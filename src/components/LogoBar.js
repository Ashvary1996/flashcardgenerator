import React, { useState } from "react";
import logo from "../assets/logo.png";

function LogoBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
  };

  return (
    <div name="logoDiv" className={`w-[100%] p-[10px] sticky top-0 z-10 flex m-auto ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <img className="h-[35px] text-left" src={logo} alt="AlmaBetterLogo" />
      <button className="text-right flex-1 mr-10 text-sm" onClick={toggleDarkMode}>
        {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default LogoBar;
