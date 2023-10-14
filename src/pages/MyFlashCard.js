import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function MyFlashCard() {
  const dataS = JSON.parse(localStorage.getItem("flashcards"));
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(6);

  const handleViewCardsClick = (elem) => {
    navigate("/flashCardDetails", { state: elem });
  };

  return (
    <div className="myFlashcardDiv">
      {dataS
        ? dataS.slice(0, showCard).map((elem, index) => (
          <div key={index} className="childCards ">
            <img className="border-2 bg-slate-400  w-20 h-20 m-auto rounded-full absolute -top-12 left-28 mb-10"
              src={elem.groupImage ? elem.groupImage : logo} />
            <h1 className="font-medium  mt-6">{elem.groupName}</h1>
            <h2 className="text-gray-500 h-16 mt-3">
              {elem.groupDescription.length > 60 ? elem.groupDescription.slice(0, 60) + "..." : null} </h2>
            <h2 className="text-gray-500 font-medium mt-3">  {elem.term.length} Cards </h2>
            <button
              className="border-2 border-red-500 font-medium  m-auto text-red-600 w-52 h-10 rounded hover:bg-red-500 hover:text-white duration-300"
              onClick={() => handleViewCardsClick(elem)} >  View Cards
            </button>
          </div>
        ))
        : "No FlashCard Here Please Create New"}

      {/* See all and See less Button if we have more than 6 FlashCard */}
      {dataS && dataS.length > 6 ? (
        <div className="w-[100%]">
          <div className="mt-5 text-right " >
            {dataS.length === showCard ?
              (
                <button onClick={() => { setShowCard(6); }}
                  className="mb-24 font-bold w-24 mx-5 text-red-700">
                  See less
                </button>) : (
                <button onClick={() => { setShowCard(dataS.length) }}
                  className="mb-24 font-bold w-24 mx-5 text-red-500 hover:text-red-700">
                  See all
                </button>
              )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MyFlashCard;
