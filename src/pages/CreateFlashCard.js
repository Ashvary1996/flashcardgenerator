// this is a create flashcard page for creating new flashcards and rendering data to the my flashcard page as we create a flashcard.

import React, { useState } from "react";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";
import validationSchema from "../components/ValidatioSchema";
import { useSelector } from "react-redux";
import { MdOutlineUploadFile } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { GiCrossMark } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";

function CreateFlashCard() {
    // Created a constant value for image validation
  const imageType = ["image/jpeg", "image/jpg", "image/png"];
   // Access form data from Redux store
  const formData = useSelector((state) => state.flashcard.formData);
    
  //for storing data in local storage 
  const [flashCardData, setFlashCardData] = useState(
    localStorage.getItem("flashcards")
      ? JSON.parse(localStorage.getItem("flashcards"))
      : []
  );
   // Created initial values for form 
  const addMoreTermS = (values, moreTerm) => {
    moreTerm.insert(values.term.length + 1, {
      termName: "",
      termDefinition: "",
      termImage: "",
    });
    toast.info("Term Card Added !", {
      position: toast.POSITION.TOP_RIGHT,
      pauseOnFocusLoss: false,
    });
  };
  
  return (
    <div
      className="w-[78%] m-auto mt-2 flex flex-col md:mt-10 "
      name="createFlashcardDiv"
    >

       {/* Adding a component to show a notification  */}
      <ToastContainer />
       
       {/* for form validation */}
      <Formik
        initialValues={formData} // Use formData from Redux store
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          flashCardData.push(values);
          localStorage.setItem("flashcards", JSON.stringify(flashCardData));
          console.log("FlashCard Created Successfully", flashCardData);
          toast.success("FlashCard Created Successfully", {
            theme: "colored",
            position: toast.POSITION.TOP_CENTER,
            pauseOnFocusLoss: false,
          });
          resetForm({ values: "" });
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <div
              className="bg-white w-[100%] h-[30%] p-[15px] flex flex-col text-left pl-[25px] rounded"
              name="createGroupDiv"
            >
              {/* It's a input field for create a group name */}
              <div className="flex flex-col md:flex-row ">
                <div className="flex flex-col">
                  <label htmlFor="groupName"> Create Group*</label>
                  <Field
                    name="groupName"
                    id="groupName"
                    type="text"
                    placeholder="Group Name"
                    className="w-full md:w-96"
                  ></Field>

                  {/* Its a component to show error message for validation */}
                  <ErrorMessage name="groupName">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                </div>

                <div>
                  {values.groupImage ? (
                    <div className="flex ">
                      <img
                        className="text-center rounded-full h-28 w-28 mx-7 "
                        src={values.groupImage}
                        alt=""
                      />

                      {/* its an image upload button */}
                      <GiCrossMark
                        name="groupImgDelIcon"
                        className="mt-[10px] -ml-[20px] text-gray-400 hover:text-red-600 hover:text-xl hover:cursor-pointer "
                        onClick={() => setFieldValue("groupImage", null)}
                      />
                    </div>
                  ) : (
                    <label
                      htmlFor="groupImage"
                      className="order w-40 h-[3px] cursor-pointer px-2  mx-3 my-3 mt-[24px] p-4  border border-gray-400 flex  items-center justify-center rounded text-sm "
                    >
                      <MdOutlineUploadFile className=" text-[2em] text-blue-700" />
                      <span className="font-bold text-blue-700 ">
                        Upload Image
                      </span>
                    </label>
                  )}
                    
                  <ErrorMessage name="groupImage">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                  {/* Image upload */}
                  <input
                    className="hidden "
                    name="groupImage"
                    id="groupImage"
                    type="file"
                    //  selecting same image
                    onClick={(event) => (event.target.value = null)}
                    onChange={(event) => {
                      event.preventDefault();
                      // Validation on image
                      if (
                        event.target.files[0] &&
                        !imageType.includes(event.target.files[0].type)
                      ) {
                        toast.warning("Please Upload in Image Format !", {
                          pauseOnFocusLoss: false,
                        });
                      } else if (event.target.files[0].size > 204800) {
                        toast.warning(
                          "Image size is very Large ! Please Select Image size less than 200kb",
                          {
                            pauseOnFocusLoss: false,
                          }
                        );
                      } else {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("groupImage", reader.result);
                        };
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col" name="groupDescriptionDiv">
                {/*it's an input field for Group Description */}
                <label htmlFor="groupDescription"> Add description</label>
                <Field
                  as="textarea"
                  name="groupDescription"
                  id="groupDescription"
                  placeholder="description "
                  className="w-full md:w-[70%] h-28 resize-none scrollbar-hide"
                ></Field>
                {/* Its a component to show error message for validation */}
                <ErrorMessage name="groupDescription">
                  {(emsg) => <div className="error ">{emsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            {/*Terms card Div Started fro here*/}
            <div
              className=" w-[100%] mt-3 pt-1 bg-white rounded flex flex-col text-left pl-[25px] "
              name="createTermCardDiv"
            >  
              <FieldArray
                name="term"
                render={(moreTerm) => (
                  <div className="flex-col overflow-hidden bg-white rounded-md">
                    {values.term &&
                      values.term.map((term, index) => (
                        <div
                          name="termsDiv"
                          className="relative flex-row flex-wrap w-full mt-2 border-gray-400 md:flex md:space-x-4 md:items-center"
                          key={index}
                        >
                          <div className="w-8 h-8 px-2 text-xl text-center text-white bg-red-500 rounded-full ">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            {/*its an input component for Term card Name */}
                            <label htmlFor={`term.${index}.termName`}>
                              Enter Term*
                            </label>
                            <Field
                              className="p-2 text-sm text-gray-900 border border-gray-400 rounded-md w-50 md:w-72 bg-gray-50"
                              name={`term.${index}.termName`}
                              id={`term.${index}.termName`}
                              value={term.termName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Name"
                            ></Field>
                            {/* Its a component to show error message for validation */}
                            <ErrorMessage name={`term.${index}.termName`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>
                          {/* It's an input component for term card definition */}
                          <div className="flex flex-col">
                            <label htmlFor={`term.${index}.termDefinition`}>
                              Enter Definition*
                            </label>
                            <Field
                              as="textarea"
                              className="w-full h-10 p-2 text-sm text-gray-700 transition-all duration-500 border border-gray-400 rounded-md resize-none focus:h-24 md:w-72 bg-gray-50 "
                              name={`term.${index}.termDefinition`}
                              id={`term.${index}.termDefinition`}
                              value={term.termDefinition}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Definition"
                            ></Field>
                            {/* Its a component to show error message for validation */}
                            <ErrorMessage name={`term.${index}.termDefinition`}>
                              {(emsg) => <div className="error ">{emsg}</div>}
                            </ErrorMessage>
                          </div>

                          <div className="flex">
                            {/*input component for Term Image */}
                            {term.termImage ? (
                              <div className="flex ">
                                <img
                                  className="w-20 h-20 p-1 rounded-lg"
                                  src={term.termImage}
                                  alt=""
                                />
                                <GiCrossMark
                                  className="mr-5 text-lg hover:text-red-600 "
                                  onClick={() =>
                                    setFieldValue(`term.${index}.termImage`, "")
                                  }
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor={`term.${index}.termImage`}
                                className="w-44 h-[44px] cursor-pointer px-3 mx-3 mt-7 py-1  flex  items-center justify-center rounded"
                              >
                                <span className="flex w-32 p-2 mx-auto font-bold text-blue-700 transition-all ease-in-out border border-blue-700 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white ">
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
                              onClick={(event) => (event.target.value = null)} //selecting same image
                              onChange={(event) => {
                                event.preventDefault();
                                // Validation on image

                                if (
                                  event.target.files[0] &&
                                  !imageType.includes(
                                    event.target.files[0].type
                                  )
                                ) {
                                  //  It's an Image Toastifying message
                                  toast.warning(
                                    "Please Upload in Image Format !",
                                    {
                                      pauseOnFocusLoss: false,
                                    }
                                  );
                                } else if (

                                  event.target.files[0].size > 204800
                                ) {
                                  toast.warning(
                                    "Image size is very Large ! Please Select Image size less than 200kb",
                                    {
                                      pauseOnFocusLoss: false,
                                    }
                                  );
                                } else   {
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
                              {/*Visible Delete btn in term if more than one */}
                              {values.term.length <= 1 ? null : (
                                <RiDeleteBin6Line
                                  className="text-[1.8em]  text-gray-500 m-2 cursor-pointer hover:text-red-600"
                                  onClick={() => {
                                    moreTerm.remove(index);
                                    toast.warn("Term Card Deleted !", {
                                      position: toast.POSITION.TOP_RIGHT,
                                      pauseOnFocusLoss: false,
                                    });
                                  }}
                                />
                              )}
                              {values.term.length <= 1 ? null : (
                                <label htmlFor={`term.${index}.termName`}>
                                  {/* its an Edit button for edit a term  */}
                                  <BiEdit className="text-[1.8em] text-gray-500 m-2 cursor-pointer hover:text-yellow-600" />
                                </label>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                     {/* It's an Add More button for adding a new term */}
                    <div
                      className="inline-block mt-4 mb-6 font-bold text-blue-700 cursor-pointer mx-7"
                      onClick={() => addMoreTermS(values, moreTerm)}
                    >
                      + Add More
                    </div>
                  </div>
                )}
              ></FieldArray>
            </div>

            {/* Its an Create button for Creating a flashcard */}
            <div className="relative pt-20">
              <button
                type="submit"
                className="absolute left-0 right-0 w-40 px-6 py-2 mx-auto mt-10 text-lg font-bold text-white transition-all ease-in-out bg-red-500 border-red-500 rounded-lg shadow-lg bottom-1 hover:bg-red-600 hover:text-white hover:-translate-y-1 "
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateFlashCard;
