import React from "react";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";
import validationSchema from "../components/ValidatioSchema";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { updateFormData,addFlashCard } from "../redux/flashcardSlice"; // Import your Redux Toolkit action
import { MdOutlineUploadFile } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { GiCrossMark } from "react-icons/gi";
// Import useHistory from react-router-dom

function CreateFlashCard() {
   // Local state to manage loading

  const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];

  
  // Initialize useHistory for navigation
  const formData = useSelector((state) => state.flashcard.formData);
  
  const flashcardData = useSelector((state) => state.flashcard.flashcards);
 

  
  

  // Save the form data to local storage when the form is submitted
 
  const dispatch = useDispatch();

  
  // console.log("data from redux store",flashcardData)
  //  console.log("data from redux store",formData)
 

  return (
    <div>
      <Formik
        initialValues={formData} // Use formData from Redux store
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: "" });
          // console.log("FormValues", values);
          
          
        
          // Dispatch the action to update the Redux store with the saved data
          dispatch(updateFormData(values));
          // console.log("Data dispatched to Redux store");
         
         // Dispatch the action to create the flashcard in Redux store
         dispatch(addFlashCard(values));
        //  console.log("Flashcard data dispatched to Redux store");

        //Store the flashcards array in local storage
        // Assuming you have access to the store's state
        
         // Update local storage with the flashcards array
         

  
       const updatedFlashcards = [...flashcardData,values];
       localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
  
        
        
        

          
          
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
                          className="mx-5 w-24 h-24 mt- rounded-full"
                          src={values.groupImage}
                          alt=""
                        />
                        <GiCrossMark
                          className="groupImgDelIcon"
                          onClick={() => setFieldValue("groupImage", "")}
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="groupImage"
                        className=" border w-34 h-[18px]  cursor-pointer px-3  mx-3 my-3 mt-[31px] p-4   border-gray-400 flex  items-center justify-center rounded  "
                      >
                        <MdOutlineUploadFile className=" text-[2em] text-blue-700" />
                        <span className="text-blue-700 font-bold">
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
                      }}
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
                    className="w-[70%] h-40"
                  ></Field>
                  <ErrorMessage name="groupDescription">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                </div>
              </div>

              {/* Term Div */}
              <div className="myFlashcardDiv">
                <FieldArray
                  name="term"
                  render={(moreTerm) => (
                    <div>
                      {values.term.map((term, index) => (
                        <div className="termsDiv" key={index}>
                          <div className="w-8 h-8 text-xl text-white text-center bg-red-600 rounded-full ">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            {/* Term Name */}
                            <label htmlFor={`term.${index}.termName`}>
                              Enter Term*
                            </label>
                            <Field
                              className="w-80 p-2"
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
                              className="w-80 p-2 h-10"
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
                              <div className="flex  ">
                                <img
                                  className="h-16 mt-2  max-w-[12rem] rounded"
                                  src={term.termImage}
                                  alt=""
                                />
                                <GiCrossMark
                                  className="text-lg hover:text-red-600 mt-1 mx-1"
                                  onClick={() =>
                                    setFieldValue(`term.${index}.termImage`, "")
                                  }
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor={`term.${index}.termImage`}
                                className="w-44 h-[38px] cursor-pointer px-3 mx-3 mt-8 py-1 border border-gray-400 flex  items-center justify-center  rounded"
                              >
                                <span className="text-blue-700 font-bold">
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
                        className="inline-block text-blue-700 mt-4 font-medium cursor-pointer"
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
              <button
                type="submit"
                className="bg-red-600 text-white text-lg p-2 pl-20 pr-20 rounded-md"
              >
                Create
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default CreateFlashCard;
