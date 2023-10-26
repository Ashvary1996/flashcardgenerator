import flashcardReducer, {
  addFlashCard,
  updateFormData,
} from "../redux/flashcardSlice";
// FlashcardSlice reducer Test
describe("flashcardSlice reducer", () => {
  it("should return the initial state", () => {
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
    };
    expect(flashcardReducer(undefined, {})).toEqual(initialState);
  });
  
  it("should handle addFlashCard", () => {
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
    };

    const newFlashcard = {
      groupName: "Math Terms",
      groupImage: "math.jpg",
      groupDescription: "Description of Math Terms",
      term: [
        {
          termName: "Addition",
          termDefinition: "The process of adding two or more numbers.",
          termImage: "addition.jpg",
        },
      ],
    };

    const action = addFlashCard(newFlashcard);
    const nextState = flashcardReducer(initialState, action);

    expect(nextState.flashcards).toEqual([newFlashcard]);
  });

  it("should handle updateFormData", () => {
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
    };

    const updatedData = {
      groupName: "Updated Group",
      groupImage: "updated-image.jpg",
    };

    const action = updateFormData(updatedData);
    const nextState = flashcardReducer(initialState, action);

    expect(nextState.formData.groupName).toEqual("Updated Group");
    expect(nextState.formData.groupImage).toEqual("updated-image.jpg");
  });
});
