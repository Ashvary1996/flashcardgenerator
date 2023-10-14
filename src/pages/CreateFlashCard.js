import React, { useEffect } from "react";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";
import validationSchema from "../components/ValidatioSchema";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { updateFormData, addFlashCard } from "../redux/flashcardSlice"; // Import your Redux Toolkit action
import { MdOutlineUploadFile } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { GiCrossMark } from "react-icons/gi";
// Import useHistory from react-router-dom

function CreateFlashCard() {


  const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];


  const formData = useSelector((state) => state.flashcard.formData); // Access form data from Redux store

  const dispatch = useDispatch();

  // Function to update local storage with new data
  const updateLocalStorage = (data) => {

    // Retrieve existing data from local storage or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem("flashcards")) || [];

    // Add the new data to the existing data array
    existingData.push(data);

    // Update the local storage with the combined data
    localStorage.setItem("flashcards", JSON.stringify(existingData));
  };

  //to retrieve existing data from local storage and update the Redux store
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("flashcards"));
    if (localData) {
      dispatch(updateFormData(localData));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="px-5 my-5 md:mt-10 ">
      <Formik
        initialValues={formData} // Use formData from Redux store
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          //resetForm({ values: "" });
          dispatch(updateFormData(values)); // Dispatch data to update Redux store
          dispatch(addFlashCard(values)); // Dispatch data to add to flashcards array in Redux store
          updateLocalStorage(values); // Add new data to local storage
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <>
            <Form>
              <div className="createFlashcardDiv">
                <div className="flex flex-row " name="groupUpperdiv">
                  <div className="flex flex-col">
                    {/* Group Name */}
                    <label htmlFor="groupName"> Create Group*</label>
                    <Field
                      name="groupName"
                      id="groupName"
                      type="text"
                      placeholder="Group Name"
                      className="w-80"
                    ></Field>
                    <ErrorMessage name="groupName">
                      {(emsg) => <div className="error ">{emsg}</div>}
                    </ErrorMessage>
                  </div>
                  {/* Group Image Div */}
                  <div>
                    {/* Group Image */}
                    {values.groupImage ? (
                      <div className="flex ">
                        <img
                          className="mx-2 w-36 h-40 mt- rounded-full text-center "
                          src={values.groupImage}
                          alt=""
                        />
                        <GiCrossMark
                          className="groupImgDelIcon"
                          onClick={() => setFieldValue("groupImage", null)}
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="groupImage"
                        className="order w-44 h-[12px]  cursor-pointer px-2  mx-3 my-3 mt-[31px] p-4   border-gray-400 flex  items-center justify-center rounded  "
                      >
                        <MdOutlineUploadFile className=" text-[2em] text-blue-700" />
                        <span className="font-bold text-blue-700">
                          Upload Image
                        </span>
                      </label>
                    )}
                    <ErrorMessage name="groupImage">
                      {(emsg) => <div className="error ">{emsg}</div>}
                    </ErrorMessage>
                    {/* Image upload */}
                    <input
                      onChange={(event) => {
                        // Validation on image
                        if (
                          event.target.files[0] &&
                          !SUPPORTED_FORMATS.includes(
                            event.target.files[0].type
                          )
                        ) {
                          alert("unsupported file format");
                        } else if (
                          event.target.files[0].size >
                          1024 * 1024 * 10
                        ) {
                          alert("image size is very large");
                        } else if (
                          event.target.files[0].size <=
                          1024 * 1024 * 10
                        ) {
                          const file = event.target.files[0];
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onload = () => {
                            setFieldValue("groupImage", reader.result);
                          };
                        }
                      }
                      }
                      className="hidden"
                      name="groupImage"
                      id="groupImage"
                      type="file"
                    />
                  </div>
                  {/* Group Image Div Ended */}
                </div>
                <div className="flex flex-col" name="groupDescriptionDiv">
                  {/* Group Description */}
                  <label htmlFor="groupDescription"> Add description</label>
                  <Field
                    as="textarea"
                    name="groupDescription"
                    id="groupDescription"
                    placeholder="description "
                    className="w-full md:w-[70%] h-44 resize-none"
                  ></Field>
                  <ErrorMessage name="groupDescription">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                </div>
              </div>

              {/* Term Div */}
              <div className="createFlashcardDiv" >
                <FieldArray
                  name="term"
                  render={(moreTerm) => (
                    <div className="p-5 mt-4 overflow-hidden bg-white rounded-md">
                      {values.term && values.term.map((term, index) => (
                        <div className="relative flex-wrap termsDiv w-full md:flex flex-row md:space-x-4 md:items-center border-gray-400" key={index}>
                          <div className="w-8 h-8 px-2 text-xl text-center text-white bg-red-500 rounded-full md:flex-col ">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            {/* Term Name */}
                            <label htmlFor={`term.${index}.termName`}>
                              Enter Term*
                            </label>
                            <Field
                              className="p-2 text-sm text-gray-900 border rounded-md w-50 border-slate-200 md:w-72 bg-gray-50"
                              name={`term.${index}.termName`}
                              id={`term.${index}.termName`}
                              value={term.termName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Name"
                            ></Field>
                            <ErrorMessage name={`term.${index}.termName`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>
                          {/* Term Definition */}
                          <div className="flex flex-col">
                            <label htmlFor={`term.${index}.termDefinition`}>
                              Enter Definition*
                            </label>
                            <Field
                              as="textarea"
                              className="h-10 p-2 text-sm text-gray-700 transition-all duration-500 ease-in-out border rounded-md resize-none w-full border-slate-200 focus:h-24 md:w-72 bg-gray-50"
                              name={`term.${index}.termDefinition`}
                              id={`term.${index}.termDefinition`}
                              value={term.termDefinition}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Definition"
                            ></Field>
                            <ErrorMessage name={`term.${index}.termDefinition`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>
                          {/* Term Image Div Started */}
                          <div className="flex">
                            {/* Term Image */}
                            {term.termImage ? (
                              <div className="my-5 space-x-4 space-y-4 md:flex ">
                              
                                <img
                                  className="h-16 mt-2  max-w-[12rem] rounded absolute top-0 right-0"
                                  src={term.termImage}
                                  alt=""
                                />
                                <GiCrossMark
                                  className="mx-1 mt-1 text-lg hover:text-red-600"
                                  onClick={() =>
                                    setFieldValue(`term.${index}.termImage`, "")
                                  }
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor={`term.${index}.termImage`}
                                className="w-44 h-[44px] cursor-pointer px-3 mx-3 mt-8 py-1  flex  items-center justify-center  rounded"
                              >
                                <span className="font-bold text-blue-700 'border-blue-700  border flex mx-auto w-32  p-2 mt-5  rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white transition-all ease-in-out ">
                                  Select Image
                                </span>
                              </label>
                            )}
                            <ErrorMessage
                              className="text-red-600"
                              component="span"
                              name={`term.${index}.termImage`}
                            />
                            {/* Input field for image upload */}
                            <input
                              onChange={(event) => {
                                // Validation on image
                                if (
                                  event.target.files[0] &&
                                  !SUPPORTED_FORMATS.includes(
                                    event.target.files[0].type
                                  )
                                ) {
                                  alert("unsupported file format");
                                } else if (
                                  event.target.files[0].size >
                                  1024 * 1024 * 10
                                ) {
                                  alert("image size is very large");
                                } else if (
                                  event.target.files[0].size <=
                                  1024 * 1024 * 10
                                ) {
                                  const file = event.target.files[0];
                                  const reader = new FileReader();
                                  reader.readAsDataURL(file);
                                  reader.onload = () => {
                                    setFieldValue(
                                      `term.${index}.termImage`,
                                      reader.result
                                    );
                                  };
                                }
                              }}
                              className="hidden"
                              id={`term.${index}.termImage`}
                              name={`term.${index}.termImage`}
                              type="file"
                            />
                            <div>
                              {/* Delete a term if more than one */}
                              {values.term.length <= 1 ? (
                                ""
                              ) : (
                                <RiDeleteBin6Line
                                  className="text-[1.8em] dark:text-grey-600 dark:hover:text-red-500 m-2 cursor-pointer"
                                  onClick={() => moreTerm.remove(index)}
                                />
                              )}
                              {values.term.length <= 1 ? (
                                ""
                              ) : (
                                <BiEdit
                                  className="text-[1.8em] text-grey-600 m-2 cursor-pointer hover:text-yellow-500"
                                  onClick={() => {
                                    setFieldValue(`term.${index}.termName`, "");
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          {/* Term Image Div Ended */}
                        </div>
                      ))}

                      <div
                        className="inline-block mt-4 font-bold text-blue-700 cursor-pointer"
                        onClick={() => {
                          moreTerm.insert(values.term.length + 1, {
                            termName: "",
                            termDefinition: "",
                            termImage: "",
                          });
                        }}
                      >
                        + Add More
                      </div>
                    </div>
                  )}
                ></FieldArray>
              </div>
              <div className="relative pt-20">
                <button

                  type="submit"
                  className="absolute left-0 right-0 w-40 px-6 py-2 mx-auto mt-10 text-lg font-bold text-red-500 transition-all ease-in-out bg-gray-100 border-red-500 rounded-lg shadow-lg bottom-1 hover:bg-red-500 hover:text-white hover:-translate-y-1 "
                >
                  Create
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default CreateFlashCard;