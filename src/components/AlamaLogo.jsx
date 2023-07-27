import React from "react";

// import  logo from "/src/assets/logo.png";

import logo from "/D/studyFolder/AlmaBetter/Group Project Almabetter//flashcardgenerator/src/assets/logo.png";

// import {almaBetterLogo} from "/src/components/pages/createFlashcardPageNo1/almaBetterLogo.png"
// this import file loaction needed to be change ^

function AlamLogo() {
  return (
    <div className=" h-8 py-8 bg-[#ffffff] border-b-4 border-[#f0edeb]">
      <img className="w-32 -my-4 mx-8" src={logo} alt="" />
    </div>
  );
}

export default AlamLogo;
