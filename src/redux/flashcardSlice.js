import { createSlice } from "@reduxjs/toolkit";

// Check if flashcards exist in local storage and initialize the state
const storedFlashcards = JSON.parse(localStorage.getItem("flashcards"));

const initialState = {
  formData: {
    groupName: "",
    groupImage: "",
    groupDescription: "",
    term: [
      {
        termName: "",
        termDefinition: "",
        termImage: "",
      },
    ],
  },
  flashcards: storedFlashcards || [], // Initialize with stored flashcards if available
};

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = action.payload;
    },
    addFlashCard: (state, action) => {
      // Add the new flashcard to the flashcards array
      state.flashcards.push(action.payload);

      // Set flashcards in local storage
      localStorage.setItem("flashcards", JSON.stringify(state.flashcards));
    },
  },
});

export const { updateFormData, addFlashCard } = flashcardSlice.actions;
export default flashcardSlice.reducer;
