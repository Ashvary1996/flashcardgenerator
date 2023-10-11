// flashcardSlice.js
import { createSlice } from "@reduxjs/toolkit";

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
  flashcards: [],
  // formGroupData:[] // Add  term property in array to store created flashcards
};

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData=action.payload
    },
    addFlashCard: (state, action) => {
      // Add the new flashcard to the flashcards array
      state.flashcards.push(action.payload);
    },
  },
});

export const { updateFormData, addFlashCard } = flashcardSlice.actions;
export default flashcardSlice.reducer;
