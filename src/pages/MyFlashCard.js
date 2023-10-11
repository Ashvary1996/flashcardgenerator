import React, { useState } from "react";
import abcd from "../assets/abcd.png";
import logo from "../assets/logo.png";
function MyFlashCard() {
  const dataS = JSON.parse(localStorage.getItem("flashcards"));
  console.log("fetchStorageData", dataS);
  const [showCard, setShowCard] = useState(6);
  return (
    <div className="myFlashcardDiv">
      <div className="parentCardDiv ">
        {dataS
          ? dataS.slice(0, showCard).map((elem, index) => (
              <div key={index} className="childCards relative ">
                <img alt=""
                  className="border-2 bg-slate-400  w-20 h-20 m-auto rounded-full absolute -top-12 left-28 mb-10"
                  src={elem.groupImage ? elem.groupImage : logo}
                />
                <h1 className="font-medium  pt-6">{elem.groupName}</h1>
                <h2 className="text-gray-500">{elem.groupDescription}</h2>
                <h2 className="text-gray-500 font-medium">
                  {elem.term.length + " Cards"}
                </h2>
                <button
                  className="border-2 border-red-500 font-medium  m-auto text-red-600 w-40 cursor-pointer  rounded "
                  onClick={() => {
                    window.location = "/flashCardDetails";
                    console.log("clicked");
                  }}
                >
                  View Cards
                </button>
              </div>
            ))
          : "No FlashCard Here Please Create New"}
      </div>

      {dataS ? (
        <div>
          {dataS.length > 6 && dataS.length !== 0 ? (
            <div className="flex justify-end mr-10 mt-5">
              {dataS.length === showCard ? (
                <button
                  onClick={() => {
                    setShowCard(6);
                  }}
                  className="mb-24 font-bold  cursor-pointer w-24 mx-5 text-red-700"
                >
                  See less
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowCard(dataS.length);
                  }}
                  className="mb-24 font-bold  cursor-pointer w-24 mx-5 text-red-700"
                >
                  See all
                </button>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default MyFlashCard;