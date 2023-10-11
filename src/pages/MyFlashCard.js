// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateFormData } from "../redux/flashcardSlice"; // Import your Redux Toolkit actions

// function MyFlashCard() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const savedData = localStorage.getItem("cardSave");
//     if (savedData) {
//       // Dispatch an action to update the Redux store with the loaded data
//       dispatch(updateFormData(JSON.parse(savedData)));
//     }
//   }, [dispatch]);

//   const flashcardData = useSelector((state) => state.flashcard.flashcards);

//   return (
//     <div className="myFlashcardDiv">
//       <div>
//         <h1>MyFlash-CardPage</h1>
//         {flashcardData && flashcardData.length > 0 ? (
//           <div>
//             {flashcardData.map((flashcard, index) => (
//               <div key={index}>
//                 <h2>Group Name: {flashcard.groupName}</h2>
//                 <p>Group Description: {flashcard.groupDescription}</p>
//                 {/* Render other flashcard details here */}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No flashcards found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyFlashCard;
