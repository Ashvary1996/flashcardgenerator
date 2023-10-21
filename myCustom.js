<div className="displayFlashcardDiv " >
{flashCardData ? flashCardData.slice(0, showCard).map((elem, index) => (
  <div key={index} className="childCards ">
    <button className="del absolute text-gray-500 -right-3 -top-5 hidden  text-3xl hover:text-4xl hover:text-red-600 " onClick={() => del(elem, index)}><GiCrossMark /></button>
    <img className="border-2 bg-slate-400  w-16 h-16 m-auto rounded-full absolute -top-12 left-[39.3%] mb-10"
      src={elem.groupImage ? elem.groupImage : logo} />
    <h1 className="font-bold  mt-4 ">{elem.groupName}</h1>
    <h2 className="text-gray-700 h-10 mt-1">
      {elem.groupDescription.length > 60 ? elem.groupDescription.slice(0, 60) + "..." : elem.groupDescription} </h2>
    <h2 className="text-gray-500 font-bold mt-8">  {elem.term.length} Cards </h2>
    <button
      className="border-2 border-red-500 font-medium  m-auto text-red-600 w-40 h-8  rounded hover:bg-red-500 hover:text-white duration-300"
      onClick={() => handleViewCardsClick(elem)} >  View Cards
    </button>
  </div>
  ))
  : <>
    <div className="text-7xl text-red-800 mt-32"> "No data available"</div>
    <p className="text-xl mt-5">Please go and <i className="text-blue-500 underline hover:text-teal-600"><Link to="/createflashcard" >Create New FlashCard</Link></i></p>
  </>}

  {/* See all and See less Button if we have more than 6 FlashCard */}
    {flashCardData && flashCardData.length > 6 ? (
  <div className="w-[100%]">
    <div className="mt-5 text-right " >
      {flashCardData.length === showCard ?
        (
          <button onClick={() => { setShowCard(6); }}
            className="mb-24 font-bold w-24 mx-5 text-red-700">
            See less
          </button>) : (
          <button onClick={() => { setShowCard(flashCardData.length) }}
            className="mb-24 font-bold w-24 mx-5 text-red-500 hover:text-red-700">
            See all
          </button>
        )}
    </div>
  </div>
    ) : null}
    
</div>


.App {
  text-align: center;
  margin: auto;
}

body::-webkit-scrollbar {
  overflow: hidden;
  width: 0px;
}

.ddes::-webkit-scrollbar {
  background-color: transparent;
  width: 5px;
}

.ddes::-webkit-scrollbar-thumb {
  background-color: rgba(255, 0, 0, 0.772);
  border-radius: 20px;
}

/* .noFlashcard{
  background-image: url("./assets/noFLashcard.jpeg");
  width: 100%;
  height: 100vh;
  background-size: auto;  
  background-repeat: no-repeat;
  border: 2px solid red;
} */
/* ............................................ */

.navlinks {
  padding-bottom: 8px;
}

.navlinks:hover {
  color: red;
  border-bottom: 3px solid red;
  padding-bottom: 2px;
  border-radius: 0.5px;
  transition: color 1s;
}

.navlinks:active {
  color: red;
  transition: none;
}

/* ............................................. */

.error {
  color: red;
}

input,
textarea {
  border: 1px solid grey;
  border-radius: 4px;
  padding: 3px;
  padding-left: 10px;
}

label {
  color: rgb(129, 125, 125);
  font-weight: bold;
  text-align: left;
  align-items: flex-start;
  margin-bottom: 4px;
}

/* .................................................  */

/* ////////////////////////   2nd Page=> MyFlashCard //////////////////////////// */

.childCards {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: red;
} 
.childCards:hover > .del {
  display: block;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}

.commonBorder {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
}
/* /////////////       3rd Page => FlashCardDetails Page /////////////// */

.shareBtns {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 5px;
  margin-bottom: 20px;
  color: rgb(93, 92, 92);
  font-weight: 500;
  width: 180px;
  transition: background-color 1s;
}

.shareBtns:focus {
  background-color: rgb(172, 23, 23);
  color: white;
  transition: none;
}

.shareBtns:hover {
  background-color: gray;
  color: white;
}

.shareIcons {
  font-size: larger;
  margin: 0px 10px;
}

/* ..................................................................... */
.modalDiv {
  z-index: 9;
  background: #363736be;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 100;
}

/* ..................................................................... */

/* CSS FOR RESPONSIVENESS STARTED */

@media screen and (max-width: 800px) {
  .midBox {
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
  }

  .flashcardsDiv {
    width: 100%;
    height: fit-content;
  }

  .groupImage,
  .selectImage {
    width: fit-content;
    margin-left: 0px;
  }

  .termDiv {
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .displayTermBox {
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .displayTermBox p {
    width: 100%;
    padding: 10px;
  }

  .dImg {
    width: 100%;
    height: 60%;
  }

  .totalCards {
    position: relative;
    left: 10px;
    text-align: center;
    margin: auto;
  }

  .displayTermBox,
  p {
    height: 300px;
  }

  .modalDiv {
    display: flex;
    padding: 0px;
    position: absolute;
    top: 40%;
    height: 500px;
  }

  .shareBtns {
    padding-right: 10px;
    font-weight: 500;
    width: fit-content;
    margin: auto;
    font-size: x-small;
  }

  .shareBtnsDiv {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
}
