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

function FlashCardDetails() {
  const location = useLocation();
  const flashcardData = location.state;
  const [term, setTerm] = useState(0);
  const [showModal, setShowModal] = useState(false);

  if (!flashcardData) { return <div>No data available.</div> }
  const nextCard = () => { if (flashcardData.term.length - 1 !== term) { setTerm(term + 1) } };
  const prevCard = () => { if (term !== 0) { setTerm(term - 1) } };


  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      {flashcardData ? (
        <div className="flashcardDetailsPAge m-auto mx-[10%]  ">
          <div className="m-auto flex flew-row pt-5">
            <div >
              {<Link to="/myflashcard"><BsArrowLeft className="text-2xl cursor-pointer hover:text-red-600 hover:font-bold" /></Link>}
            </div>
            <div className="text-left mx-4 p-3 relative -top-5">
              <h1 className="text-2xl font-bold mb-2">{flashcardData.groupName}</h1>
              <h1 className="text-gray-500"> {flashcardData.groupDescription}</h1>
            </div>
          </div>

          {/* //FlashCard Term Componenet whole div bottom white */}
          <div className="midBox flex flex-row gap-5 ">
            {/* Left Div */}
            <div className="flashcardsDiv commonBorder bg-slate-50 pl-2  w-[20%] text-left overflow-hidden">
              <h2 className="text-gray-500 p-2 ">Flashcards</h2>
              <hr className=" border-gray-300 w-[90%] mb-2" />
              <div className="termDiv ml-1 ">
                {flashcardData.term.map((elem, i) => (
                  <div key={i} className={`singleTerms p-1 cursor-pointer ${term === i ? "text-red-600 font-bold" : "text-gray-800 hover:text-red-600"}`}>
                    <button onClick={() => setTerm(i)}>{elem.termName}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mid component */}
            <div className="displayTermBox commonBorder flex flex-row p-5 bg-white w-[60%] h-[300px] justify-around">
              <p><img className=" commonBorder max-w-[100%]  h-[100%] m-auto"
                src={flashcardData.term[term].termImage}
                alt=""
              /></p>
              <p className="w-[50%] ml-4 text-gray-600 text-left ">
                {flashcardData.term[term].termDefinition}
              </p>
            </div>

            {/* Right  print btns Div*/}
            <div  >
              <button
                className="commonBorder shareBtns "
                onClick={() => { setShowModal(true) }}>
                {<RiArrowGoForwardLine className="ico" />}Share
              </button>
              <button className="commonBorder shareBtns  ">{<TbDownload className="ico" />} Download</button>
              <button className="commonBorder shareBtns " onClick={() => window.print()}>
                {<LiaPrintSolid className="ico" />} Print
              </button>
            </div>
          </div>
          {/* paginations btns */}
          <div className="flex justify-center items-center">
            <MdNavigateBefore
              className="text-5xl cursor-pointer dark:text-gray-400 hover:text-red-500 "
              onClick={prevCard}
            />
            <span className="ml-10">{term + 1}/</span>
            <span className="mr-10">{flashcardData.term.length}</span>
            <MdNavigateNext
              className="text-5xl cursor-pointer dark:text-gray-400  hover:text-red-500 "
              onClick={nextCard}
            />
          </div>
        </div>
      ) : (
        "kuch nhi hai yaar"
      )}
    </>
  );
}

export default FlashCardDetails;
