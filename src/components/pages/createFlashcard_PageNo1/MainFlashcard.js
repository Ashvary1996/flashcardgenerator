import React from "react";
import { Link } from "react-router-dom";

function MainFlashcard() {
  return (
    <>
      <div>
        <div>
          <div className="m-auto  text-center border-1 border-sky-500 relative">
            <h1 className="text-xl font-bold text-left ">Create Flashcard</h1>
            <ul className="flex flex-row space-x-11 my-3 mx-1 text-gray-500 font-bold text-text-base  ">
              <li className="navlinks">
                <Link to="/CreateFlashcard">Create New</Link>
              </li>
              <li className="navlinks">
                <Link to="/MyFlashcard">MyFlashcard</Link>
              </li>
            </ul>
          </div>

          <hr className=" border-b-1 border-gray-400 -my-[13.5px]" />
        </div>
      </div>
    </>
  );
}
export default MainFlashcard;
