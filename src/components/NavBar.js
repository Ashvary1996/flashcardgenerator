import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbarDiv">
      <div className="m-auto text-center    relative">
        <h1 className="text-lg font-bold text-left ">Create Flashcard</h1>
        <ul className="flex flex-row space-x-11 my-3 mx-1 text-gray-500 font-bold text-text-base  ">
          <li className="navlinks">
            <Link to="/createflashcard">Create New</Link>
          </li>
          <li className="navlinks">
            <Link to="/myflashcard">MyFlashcard</Link>
          </li>
        </ul>
      </div>
      <hr className=" border-1 border-gray-400 -my-[13.5px]" />
    </div>
  );
}

export default NavBar;
