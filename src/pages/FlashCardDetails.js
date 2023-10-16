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

  // if (!flashcardData) { return <div>No data available.</div> }
  const nextCard = () => { if (flashcardData.term.length - 1 !== term) { setTerm(term + 1) } };
  const prevCard = () => { if (term !== 0) { setTerm(term - 1) } };
  
  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} />
      
      {flashcardData ? (
        <div className="flashcardDetailsPAge m-auto mx-[10%]  ">
          <div className="flex pt-1 m-auto flew-row">
            <div >
              {<Link to="/myflashcard"><BsArrowLeft className="text-2xl cursor-pointer hover:text-red-600  " /></Link>}
            </div>
            <div className="relative p-2 mx-4 text-left -top-5">
              <h1 className="mb-1 text-2xl font-bold">{flashcardData.groupName}</h1>
              <h1 className="text-gray-500"> {flashcardData.groupDescription}</h1>
            </div>
          </div>

          {/* //FlashCard Term Componenet whole div bottom white */}
          <div className="flex flex-row gap-5 midBox ">
            {/* Left Div */}
            <div className="flashcardsDiv commonBorder bg-slate-50 pl-2  w-[20%] text-left overflow-hidden">
              <h2 className="p-1 font-semibold text-gray-500 ">Flashcards</h2>
              <hr className=" border-gray-300 w-[90%] mb-2" />
              <div className="ml-1 termDiv ">
                {flashcardData.term.map((elem, i) => (
                  <div key={i} className={`p-1 cursor-pointer ${term === i ? "text-red-600 font-bold" : "text-gray-800 hover:text-red-600"}`}>
                    <button onClick={() => setTerm(i)}>{elem.termName}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Mid component */}
            <div className="displayTermBox commonBorder flex flex-row p-5 bg-white w-[60%] h-[300px] justify-around">
              <p className={`${!flashcardData.term[term].termImage ? "hidden" : "dImg w-[50%] h-[100%]"}`}>
                <img className=" commonBorder max-w-[100%]  h-[100%] m-auto"
                  src={flashcardData.term[term].termImage}
                  alt=""
                />
              </p>
              <p className={`${!flashcardData.term[term].termImage ? " w-[90%] " : "ddes w-[50%] h-[100%]  ml-4 text-gray-600 text-left overflow-y-auto"}`}>
                {flashcardData.term[term].termDefinition}
              </p>
            </div>

            {/* Right  print btns Div*/}
            <div className="shareBtnsDiv">
              <button
                className="rounded-md commonBorder shareBtns"
                onClick={() => { setShowModal(true) }}>
                {<RiArrowGoForwardLine className="ico" />}Share
              </button>
              <button className="commonBorder shareBtns ">{<TbDownload className="ico" />} Download</button>
              <button className="commonBorder shareBtns " onClick={() => window.print()}>
                {<LiaPrintSolid className="ico" />} Print
              </button>
            </div>

          </div>

          <p className='mx-auto  h-3 w-60 bg-black opacity-5 mt-3 rounded-[100%] shadow-xl'>

          </p>

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
        <>
          <div className="text-7xl text-red-800 mt-32"> "No data available"</div>
          <p className="text-xl mt-5">Please go to <i className="text-blue-500 underline hover:text-teal-600"><Link to="/createflashcard" >Create New FlashCard</Link></i></p>
        </>
      )}
    </>
  );
}

export default FlashCardDetails;
