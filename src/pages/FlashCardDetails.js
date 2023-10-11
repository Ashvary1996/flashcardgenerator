import React from "react";
 

function FlashCardDetails() {
  const dataS = JSON.parse(localStorage.getItem("flashcards"));
  console.log("fetchStorageData", dataS);

  return (
    <div>
      <h1> FlashCard - Details Page</h1>
      {dataS.length}
    </div>
  );
}

export default FlashCardDetails;
