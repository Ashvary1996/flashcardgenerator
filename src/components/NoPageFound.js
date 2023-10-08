import React from "react";

function NoPageFound() {
  return (
    <>
      <h1> {(document.body.innerHTML = "Page Not Found")} </h1>
    </>
  );
}

export default NoPageFound;
