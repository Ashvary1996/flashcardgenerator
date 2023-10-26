import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MyFlashCard from "../pages/MyFlashCard";
import { MemoryRouter } from "react-router-dom";

// Mock the react-toastify component
jest.mock("react-toastify", () => ({
  ToastContainer: () => null,
}));

// Mock the DeleteModal component
jest.mock("../components/DeleteModal", () => "DeleteModal");

// Mock localStorage for testing
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe("MyFlashCard", () => {
  it("renders the component", () => {
    render(
      <MemoryRouter>
        <MyFlashCard />
      </MemoryRouter>
    );
    const createFlashcardLink = screen.getByText("Create New FlashCard");
    expect(createFlashcardLink).toBeInTheDocument();
  });

  //   it('displays flashcard data', () => {
  //     // Mock flashCardData
  //     const mockFlashCardData = [
  //       {
  //         groupName: 'Test Group 1',
  //         groupDescription: 'Test Description 1',
  //         term: [{termName: "term1", termDefinition: "my name is sudhir", termImage: ""}],
  //       }

  //     ];

  //     localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFlashCardData));

  //     render( <MemoryRouter>
  //         <MyFlashCard />
  //       </MemoryRouter>);

  //     const groupNames = screen.queryAllByText("Test Group 1");
  //     expect(groupNames).toHaveLength(1);
  //   });

  //   it('handles "See all" and "See less" buttons', () => {
  //     // Mock flashCardData
  //     const mockFlashCardData = [
  //       {
  //         groupName: 'Test Group 1',
  //         groupDescription: 'Test Description 1',
  //         term: [],
  //       },
  //       {
  //         groupName: 'Test Group 2',
  //         groupDescription: 'Test Description 2',
  //         term: [],
  //       },
  //     ];

  //     localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFlashCardData));

  //     render(<MyFlashCard />);

  //     const seeAllButton = screen.getByText('See all');
  //     const seeLessButton = screen.getByText('See less');

  //     // Initially, the "See all" button should be displayed
  //     expect(seeAllButton).toBeInTheDocument();
  //     expect(seeLessButton).not.toBeInTheDocument();

  //     fireEvent.click(seeAllButton);

  //     // After clicking "See all," the "See less" button should be displayed
  //     expect(seeAllButton).not.toBeInTheDocument();
  //     expect(seeLessButton).toBeInTheDocument();

  //     fireEvent.click(seeLessButton);

  //     // After clicking "See less," the "See all" button should be displayed again
  //     expect(seeAllButton).toBeInTheDocument();
  //     expect(seeLessButton).not.toBeInTheDocument();
  //   });

  // You can write more test cases as needed
});
