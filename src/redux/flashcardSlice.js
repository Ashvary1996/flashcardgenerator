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
};

const flashcardSlice = createSlice({
  name: "flashcard",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { updateFormData } = flashcardSlice.actions;
export default flashcardSlice.reducer;
