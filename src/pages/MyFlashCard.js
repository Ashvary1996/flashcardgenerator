import React from "react";

function MyFlashCard() {
  const dataS = JSON.parse(localStorage.getItem("cardSave"));
  console.log(dataS);

  return (
    <div className="myFlashcardDiv">
      <div>
        <h1>MyFlash-CardPage</h1>
        
      </div>
    </div>
  );
}

export default MyFlashCard;
