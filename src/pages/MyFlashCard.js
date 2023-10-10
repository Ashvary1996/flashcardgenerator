import React from "react";

function MyFlashCard() {
  const dataS = JSON.parse(localStorage.getItem("cardSave"));
  console.log("fetchStorageData",dataS);

  return (
    <div className="myFlashcardDiv">
      <div>
        <h1>MyFlash-CardPage</h1>
        {dataS.map((elem, index) => (
          <div key={index}>
            <h1>{elem.groupName}</h1>
          </div>
        ))}
        <p>"DataLength"= {dataS.length}</p>
      </div>
    </div>
  );
}

export default MyFlashCard;
