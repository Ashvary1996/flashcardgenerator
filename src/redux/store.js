
import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "./flashcardSlice";


 const store = configureStore({ 
    reducer: {
      flashcard: flashcardReducer,
    },
  });

  export default store;