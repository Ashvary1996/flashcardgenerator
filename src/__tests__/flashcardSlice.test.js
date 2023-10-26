// Import necessary dependencies
import flashcardReducer, {
  addFlashCard,
  updateFormData,
} from "../redux/flashcardSlice";

// FlashcardSlice reducer Test
describe("flashcardSlice reducer", () => {
  // Test case for the initial state
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

  // Test case for the addFlashCard action
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
      ]
      };

    // Create an action using the addFlashCard function
    const action = addFlashCard(newFlashcard);

    // Apply the action to the reducer and get the next state
    const nextState = flashcardReducer(initialState, action);

    // Check if the flashcard was added to the state
    expect(nextState.flashcards).toEqual([newFlashcard]);
  });

  // Test case for the updateFormData action
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

    // Create an action using the updateFormData function
    const action = updateFormData(updatedData);

    // Apply the action to the reducer and get the next state
    const nextState = flashcardReducer(initialState, action);

    // Check if the formData was updated correctly
    expect(nextState.formData.groupName).toEqual("Updated Group");
    expect(nextState.formData.groupImage).toEqual("updated-image.jpg");
  });
});
