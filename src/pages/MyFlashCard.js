import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import pokeball from "../assets/pokeball.png";
import noFLashcard from "../assets/noFLashcard.jpeg";
import { GiCrossMark } from "react-icons/gi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../components/DeleteModal";

function MyFlashCard() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [flashCardData, setFlashCardData] = useState(
    localStorage.getItem("flashcards")
      ? JSON.parse(localStorage.getItem("flashcards"))
      : []
  );

  const [delClickedItem, setDelClickedItem] = useState(null);

  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(6);
  const handleViewCardsClick = (elem) => {
    navigate("/flashCardDetails", { state: elem });
  };

  const deleteFlashCard = (delClickedItem) => {
    setDelClickedItem(delClickedItem);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="myFlashcardDiv w-[78%] m-auto mt-3 ">
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          flashCardData={flashCardData}
          setFlashCardData={setFlashCardData}
          delClickedItem={delClickedItem} // Pass the clicked item to the modal
        />
        <ToastContainer />
        <div className="totalCards text-right pr-10 text-sm absolute right-24 text-gray-500 font-bold overflow-visible">
          {!flashCardData.length
            ? null
            : `Total FlashCards :${flashCardData.length}`}
        </div>
        <div
          name="displayFlashcardDiv"
          className=" flex flex-wrap m-auto overflow-hidden  "
        >
          {flashCardData.length !== 0 ? (
            flashCardData
              .slice(0, showCard)
              .reverse()
              .map((elem, index) => (
                <div
                  key={index}
                  name="childCards"
                  className="commonBorder flex flex-col m-auto bg-white w-[300px] h-[200px] p-[8px] rounded mt-[50px] relative mb-[10px] "
                >
                  <button
                    className="del absolute text-gray-500 -right-3 -top-5 hidden  text-3xl hover:text-4xl hover:text-red-600 "
                    onClick={() => {
                      deleteFlashCard(elem, index);
                    }}
                  >
                    <GiCrossMark />
                  </button>
                  <img
                    className="border-2 bg-slate-400  w-[70px] h-[70px] m-auto rounded-full absolute -top-12 left-[39.3%] mb-10"
                    src={elem.groupImage ? elem.groupImage : pokeball}
                    alt=""
                  />
                  <h1 className="font-bold  mt-4 ">{elem.groupName}</h1>
                  <h2 className="text-gray-700 h-10 mt-1">
                    {elem.groupDescription.length > 60
                      ? elem.groupDescription.slice(0, 60) + "..."
                      : elem.groupDescription}{" "}
                  </h2>
                  <h2 className="text-gray-500 font-bold mt-8">
                    {elem.term.length} Cards{" "}
                  </h2>
                  <button
                    className="border-2 border-red-500 font-medium  m-auto text-red-600 w-40 h-8  rounded hover:bg-red-500 hover:text-white duration-300"
                    onClick={() => handleViewCardsClick(elem)}
                  >
                    View Cards
                  </button>
                </div>
              ))
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

          {/* See all and See less Button if we have more than 6 FlashCard */}
          {flashCardData && flashCardData.length > 6 ? (
            <div className="w-[100%]">
              <div className="mt-5 text-right ">
                {flashCardData.length === showCard ? (
                  <button
                    onClick={() => {
                      setShowCard(6);
                    }}
                    className="mb-24 font-bold w-24 mx-5 text-red-700"
                  >
                    See less
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowCard(flashCardData.length);
                    }}
                    className="mb-24 font-bold w-24 mx-5 text-red-500 hover:text-red-700"
                  >
                    See all
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MyFlashCard;
