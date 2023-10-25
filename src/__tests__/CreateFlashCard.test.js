// Import the necessary libraries and components
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateFlashCard from '../pages/CreateFlashCard';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';


// Mock Redux store setup
const mockStore = configureStore([]);
const initialState = {
  flashcard: {
    formData: {
      groupName: 'Test Group',
      groupImage: null,
      groupDescription: 'Test Description',
      term: [
        {
          termName: 'Term 1',
          termDefinition: 'Definition 1',
          termImage: null,
        },
      ],
    },
    flashcards: [],
  },
};
const store = mockStore(initialState);

test('Render input fields', () => {
  render(
    <Provider store={store}>
      <CreateFlashCard />
    </Provider>
  );

  // Example: Test if the "Create Group*" input field is rendered
  const groupNameInput = screen.getByLabelText('Create Group*');
  expect(groupNameInput).toBeInTheDocument();

  // Example: Test if the "Add description" input field is rendered
  const descriptionInput = screen.getByLabelText('Add description');
  expect(descriptionInput).toBeInTheDocument();

  // You can continue adding more tests for other input fields and components as needed.
});

// 

// test('Submitting the form', () => {
//     render(<Provider store={store}>
//         <CreateFlashCard />
//       </Provider>);
//     const submitForm = jest.fn(); // Mock the submitForm function
  
//     // Simulate form input changes
//     fireEvent.change(screen.getByLabelText("Create Group*"), {
//       target: { value: "Test Group1" },
//     });
  
//     fireEvent.change(screen.getByLabelText("Add description"), {
//       target: { value: "Test Description1" },
//     });
  
//     // Replace these lines with input changes for your "term" inputs if needed
//     fireEvent.change(screen.getByLabelText("Enter Term*"), {
//       target: { value: "Term-1" },
//     });
  
//     fireEvent.change(screen.getByLabelText("Enter Definition*"), {
//       target: { value: "Definition-1" },
//     });
  
//     // Simulate clicking the submit button
//     fireEvent.click(screen.getByText("Create"));
  
//     //Assert that submitForm is called
//     expect(submitForm).toHaveBeenCalledTimes(1);

//   // Example: Verify if the form submission function was called with the updated data
//   expect(submitForm).toHaveBeenCalledWith({
//     groupName: 'Test Group1',
//     groupImage: null,
//     groupDescription: 'Test Description1',
//     term: [
//       {
//         termName: 'Term-1',
//         termDefinition: 'Definition-1',
//         termImage: null,
//       },
//       // You can add more term objects here if needed
//     ],
//   });

//   // You can continue adding more form submission tests as needed.
// });

