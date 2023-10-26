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

  // You can write more test cases as needed
});
