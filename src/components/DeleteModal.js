import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteModal(props) {
  const {
    showDeleteModal,
    setShowDeleteModal,
    flashCardData,
    setFlashCardData,
  } = props;

  return (
    <>
      {/* This is Delete Modal it will appear at the time of Deleting Flashcard ,
      we have taken this component from Tailwind and modified to our need*/}
      {showDeleteModal ? (
        <div
          className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <h2 className="text-xl font-bold py-4">Are you sure?</h2>
                <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete this Flashcard? This process
                  cannot be undone.
                </p>
              </div>
              <div className="p-3 mt-2 text-center space-x-4 md:block">
                {/* //Button for Closing the modal */}
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                {/* // onClick button function for Deleting the flashcard */}
                <button
                  onClick={() => {
                    const newData = flashCardData.filter(
                      (elem) => elem !== props.delClickedItem
                    );
                    // Setting and Saving new data after delete.
                    setFlashCardData(newData);
                    localStorage.setItem("flashcards", JSON.stringify(newData));
                    toast.error(
                      `${props.delClickedItem.groupName} Flashcard Deleted`,
                      {
                        theme: "colored",
                        icon: false,
                        pauseOnFocusLoss: false,
                      }
                    );
                    // Close the modal
                    setShowDeleteModal(false);
                  }}
                  className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DeleteModal;
