// this is a MyFlashcard page for rendering the data of users and creating the cards. myflashcard page shows the number of cards created by the users and user can delete cards as well as see the details of cards on the click of view card  button

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { GiCrossMark } from "react-icons/gi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from "../components/DeleteModal";

function MyFlashCard() {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);
  const [flashCardData, setFlashCardData] = useState(localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards"))
    : []
  );

// import useNavigate for navigate the page 
  const navigate = useNavigate();

    // created a useState for manage  (show more ) button and initializes with 6. when number of cards will be six or more then (show more) button will appear
  const [showCard, setShowCard] = useState(6);
  const handleViewCardsClick = (elem) => {
    navigate("/flashCardDetails", { state: elem });
  };

// for deleting a flashcard if you dont want extra data 
  const deleteFlashCard = (delClickedItem) => {
    setShowDeleteModal(true);
    if (deleteCard === true) {

      console.log(deleteCard);
      let newData = [...flashCardData]
      newData = flashCardData.filter((elem) => {
        return elem !== delClickedItem;
      })
      setFlashCardData(newData);
      localStorage.setItem("flashcards", JSON.stringify(newData));
      toast.error(delClickedItem.groupName + " Flashcard Deleted ", { theme: "colored", icon: false, pauseOnFocusLoss: false })
    }
    else {
      setDeleteCard(false);

    }
  };
  return (
    <>
      {/* when length of card will be zero we show a message => Flashcards Is Not Available. if length of card 1 or more then it will show the cards */}

      <div className="myFlashcardDiv w-[78%] m-auto mt-3 ">
        <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} deleteCard={deleteCard} setDeleteCard={setDeleteCard} />
        <ToastContainer />
        <div className="absolute pr-10 text-sm font-bold text-right text-gray-500 right-24">Total FlashCards : {flashCardData.length}</div>
        <div name="displayFlashcardDiv"
          className="flex flex-wrap m-auto overflow-hidden " >
          {flashCardData.length !== 0 ? flashCardData.slice(0, showCard).map((elem, index) => (
            <div key={index} name="childCards" className="childCards flex flex-col m-auto bg-white w-[300px] h-[200px] p-[8px] rounded mt-[50px] relative mb-[10px] ">
              <button className="absolute hidden text-3xl text-gray-500 del -right-3 -top-5 hover:text-4xl hover:text-red-600 " onClick={() => { deleteFlashCard(elem, index) }}><GiCrossMark /></button>
              <img className="border-2 bg-slate-400  w-[70px] h-[70px] m-auto rounded-full absolute -top-12 left-[39.3%] mb-10"
                src={elem.groupImage ? elem.groupImage : logo} />
              <h1 className="mt-4 font-bold ">{elem.groupName}</h1>
              <h2 className="h-10 mt-1 text-gray-700">
                {elem.groupDescription.length > 60 ? elem.groupDescription.slice(0, 60) + "..." : elem.groupDescription} </h2>
              <h2 className="mt-8 font-bold text-gray-500">  {elem.term.length} Cards </h2>
              <button
                className="w-40 h-8 m-auto font-medium text-red-600 duration-300 border-2 border-red-500 rounded hover:bg-red-500 hover:text-white"
                onClick={() => handleViewCardsClick(elem)} >  View Cards
              </button>
            </div>
          ))
            : <>
              <div className="mt-32 text-red-800 text-7xl"> "No data available"</div>
              <p className="mt-5 text-xl">Please go and <i className="text-blue-500 underline hover:text-teal-600"><Link to="/createflashcard" >Create New FlashCard</Link></i></p>
            </>}

          {/* See all and See less Button if we have more than 6 FlashCard */}
          {flashCardData && flashCardData.length > 6 ? (
            <div className="w-[100%]">
              <div className="mt-5 text-right " >
                
                {flashCardData.length === showCard ?
                  (
                    <button onClick={() => { setShowCard(6); }}
                      className="w-24 mx-5 mb-24 font-bold text-red-700">
                      See less
                    </button>) : (
                    <button onClick={() => { setShowCard(flashCardData.length) }}
                      className="w-24 mx-5 mb-24 font-bold text-red-500 hover:text-red-700">
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
