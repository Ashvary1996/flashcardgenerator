/* in this file we are creating a flash card details which is shown when the user clicks on view card on myflashcard page
in starting of this page we will show group name and group discription before group name we are having back arrow button oncilcing 
on that we will go one step back using useNavigate. then we are showing cards name and description of card with card image
then we are having share button download button and print button. when we will click one share button we will
going to see the share share link and button for coppying link when we click on copy button the link get copy
notifiction is shown "link copied to clickboard*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { TbDownload } from "react-icons/tb";
import { LiaPrintSolid } from "react-icons/lia";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import noFLashcard from "../assets/noFLashcard.jpeg";
import PdfDownload from "../components/PdfDownload"

function FlashCardDetails() {
  const location = useLocation();
  const flashcardData = location.state;
  const [term, setTerm] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const nextCard = () => {
    if (flashcardData.term.length - 1 !== term) {
      setTerm(term + 1);
    }
  };
  const prevCard = () => {
    if (term !== 0) {
      setTerm(term - 1);
    }
  };

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      {flashcardData ? (
        <div className="flashcardDetailsPAge m-auto mx-[10%]  mt-5 ">
          <div className="flex pt-1 m-auto flew-row">
            <div>
              {
                <Link to="/myflashcard">
                  <BsArrowLeft className="text-2xl cursor-pointer hover:text-red-600  " />
                </Link>
              }
            </div>
            <div className="relative p-2 mx-4 text-left -top-5">
              <h1 className="mb-1 text-2xl font-bold">
                {flashcardData.groupName}
              </h1>
              <h1 className="text-gray-500">
                {flashcardData.groupDescription}
              </h1>
            </div>
          </div>

          {/* //FlashCard Term Component whole div bottom white */}
          <div className="flex flex-row gap-5 midBox ">
            {/* Left Div */}
            <div className="flashcardsDiv commonBorder bg-slate-50 pl-2  w-[20%] text-left overflow-hidden">
              <h2 className="p-1 font-semibold text-gray-500 ">Flashcards</h2>
              <hr className=" border-gray-300 w-[90%] mb-2" />
              <div className="ml-1 termDiv ">
                {flashcardData.term.map((elem, i) => (
                  <div
                    key={i}
                    className={`p-1 cursor-pointer ${
                      term === i
                        ? "text-red-600 font-bold"
                        : "text-gray-800 hover:text-red-600"
                    }`}
                  >
                    <button onClick={() => setTerm(i)}>{elem.termName}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mid component */}
            <div className="displayTermBox commonBorder flex flex-row p-5 bg-white w-[60%] h-[300px] justify-around">
              <p
                className={`${
                  !flashcardData.term[term].termImage
                    ? "hidden"
                    : "dImg w-[50%] h-[100%]"
                }`}
              >
                <img
                  className=" commonBorder max-w-[100%]  h-[100%] m-auto"
                  src={flashcardData.term[term].termImage}
                  alt=""
                />
              </p>
              <p
                className={`${
                  !flashcardData.term[term].termImage
                    ? " w-[90%] "
                    : "ddes w-[50%] h-[100%]  ml-4 text-gray-600 text-left overflow-y-auto"
                }`}
              >
                {flashcardData.term[term].termDefinition}
              </p>
            </div>

            {/* Right  print btns Div*/}
            <div className="shareBtnsDiv">
              <button
                className="rounded-md commonBorder shareBtns"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                {<RiArrowGoForwardLine className="shareIcons" />}Share
              </button>
              {/* flashCard download function */}
              <button className="commonBorder shareBtns ">
                {<TbDownload className="shareIcons" />} 

                 <PdfDownload
                 buttonLabel="Download"
                 flashcardData={flashcardData} // Pdf download component
                />
              </button>
              {/* flashCard Print button */}
              <button
                className="commonBorder shareBtns "
                onClick={() => window.print()}
              >
                {<LiaPrintSolid className="shareIcons" />} Print
              </button>
            </div>
          </div>

          <p className="mx-auto  h-3 w-60 bg-black opacity-5 mt-3 rounded-[100%] shadow-xl"></p>

          {/* paginations btns */}
          <div className="cursolBtn flex justify-center items-center">
            <MdNavigateBefore
              className="text-5xl cursor-pointer dark:text-gray-400 hover:text-red-500 "
              onClick={prevCard}
            />
            <span className="ml-10">{term + 1}/</span>
            <span className="mr-10">{flashcardData.term.length}</span>
            <MdNavigateNext
              className="text-5xl cursor-pointer dark:text-gray-400 hover:text-red-500 "
              onClick={nextCard}
            />
          </div>
        </div>
      ) : (
        <div className=" w-[100%] h-[80vh] rounded noFlashcard overflow-hidden relative font-bold">
          <img
            className="absolute w-[100%] h-[100%]  "
            src={noFLashcard}
            alt=""
          />
          <div className="text-7xl text-red-800 mt-32  backdrop-blur-sm">
            "No Flashcard available"
          </div>
          <br />
          <p className="text-xl mt-5  backdrop-blur-sm">
            Please go and
            <i className=" text-amber-950 underline hover:text-teal-700  ">
              <Link to="/createflashcard"> Create New FlashCard</Link>
            </i>
          </p>
        </div>
      )}
    </>
  );
}

export default FlashCardDetails;
