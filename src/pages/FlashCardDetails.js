import React from "react";
import { Link, useLocation } from "react-router-dom";
import SelectedFlashcard from "../components/SelectedFlashcard";
import noFLashcard from "../assets/noFLashcard.jpeg";

// This is my flashcard details page where all description of flashcard are given.

function FlashCardDetails() {
  // It access the current location object
  const location = useLocation();
  const flashcardData = location.state;
  return (
    <>
      {flashcardData ? (
        <SelectedFlashcard location={location} flashcardData={flashcardData} />
      ) : (
        <div className=" w-[100%] h-[80vh] rounded noFlashcard overflow-hidden relative font-bold">
          <img
            className="absolute w-[100%] h-[100%]  "
            src={noFLashcard}
            alt=""
          />
          <div className="text-5xl text-red-800 mt-32  backdrop-blur-sm w-[80%] m-auto">
            "You directly Jump to this Flashcard details page without selecting
            any card"
          </div>
          <br />
          <p className="text-xl mt-5  backdrop-blur-sm">
            Please go and select
            <i className=" text-amber-950 underline hover:text-teal-700  ">
              <Link to="/myflashcard"> Your FlashCard</Link>
            </i>
          </p>
        </div>
      )}
    </>
  );
}

export default FlashCardDetails;
