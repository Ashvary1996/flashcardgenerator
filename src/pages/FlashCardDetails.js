import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { RiArrowGoForwardLine } from "react-icons/ri";
import { TbDownload } from "react-icons/tb";
import { LiaPrintSolid } from "react-icons/lia";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { useLocation } from "react-router-dom";

function FlashCardDetails() {
  // const dataS = JSON.parse(localStorage.getItem("flashcards"));
  // console.log("fetchStorageData", dataS);
  const location = useLocation();
  const flashcardData = location.state;
  const [term, setTerm] = useState(0);
  //console.log("location data",flashcardData)
  // Now you have access to the flashcardData
  // console.log("Received flashcardData from Myflashcard:", flashcardData);
  console.log("Checking", flashcardData.term.length - 1, term);

  if (!flashcardData) {
    return <div>No data available.</div>;
  }

  const nextCard = () => {
    if (flashcardData.term.length - 1 !== term) {
      setTerm(term + 1);
    }
    console.log("clicked nextCard");
  };
  const prevCard = () => {
    if (term !== 0) {
      setTerm(term - 1);
    }

    console.log("clicked prevCard");
  };

  return (
    <>
      {flashcardData ? (
        <div className="flashcardDetailsPAge m-auto mx-32 border border-red-500">
          <div className="m-auto flex flew-row pt-5">
            <div>
              {
                <Link to="/myflashcard">
                  <BsArrowLeft
                    className="text-2xl cursor-pointer"
                    // onClick={() => (window.location = "/myflashcard")}
                  />
                </Link>
              }
            </div>
            <div className="text-left mx-4 p-3 relative -top-5">
              <h1 className="text-2xl font-bold mb-2">
                {flashcardData.groupName}
              </h1>
              <h1 className="text-gray-500">
                {flashcardData.groupDescription}
              </h1>
            </div>
          </div>
          {/* //MAin Componenet */}
          <div className="flex flex-row gap-5 ">
            {/*no of terms  */}
            <div className="border border-red-500 bg-slate-50 p-6 w-[20%] text-left">
              <h2 className="text-gray-500">Flashcards</h2>
              <hr className=" border-gray-300 w-[100%]" />
              <div className=" border border-red-200 mt-3">
                {flashcardData.term.map((elem, i) => (
                  <>
                    <div
                      className={`p-2 cursor-pointer ${
                        term === i ? "text-red-600" : ""
                      }`}
                      key={i}
                    >
                      <button onClick={() => setTerm(i)}>
                        {elem.termName}
                      </button>
                    </div>
                    {/* ................ */}
                     
                  </>
                ))}
              </div>
            </div>
            {/* mid component */}
            <div className="border border-red-500 flex flex-row p-10 bg-white w-[60%] h-[300px]">
              <img
                className="w-[40%] h-[100%] border border-red-500"
                src={flashcardData.term[term].termImage}
                alt=""
              />
              <p className="w-[40%] border border-red-500 mx-4 text-gray-600 text-left ">
                {flashcardData.term[term].termDefinition}
              </p>
            </div>
            {/* print btns */}
            <div className="border border-red-500 p-3 w-[20%]">
              <div className="shareBtns ">{<RiArrowGoForwardLine />}Share </div>
              <div className="shareBtns  ">{<TbDownload />} Download</div>
              <div className="shareBtns ">{<LiaPrintSolid />} Print</div>
            </div>
          </div>
          {/* paginations btns */}
          <div className="flex justify-center items-center">
            <MdNavigateBefore
              className="text-5xl cursor-pointer dark:text-gray-400 "
              onClick={prevCard}
            />
            <span className="ml-10">{term + 1}/</span>
            <span className="mr-10">{flashcardData.term.length}</span>
            <MdNavigateNext
              className="text-5xl cursor-pointer dark:text-gray-400  "
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
