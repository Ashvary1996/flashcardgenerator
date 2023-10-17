import React, { useState } from "react";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";
import validationSchema from "../components/ValidatioSchema";
import { useSelector } from "react-redux";
import { MdOutlineUploadFile } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { GiCrossMark } from "react-icons/gi";
import { ToastContainer, toast } from 'react-toastify';


function CreateFlashCard() {

  const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
  const formData = useSelector((state) => state.flashcard.formData); // Access form data from Redux store
  const [flashCardData, setFlashCardData] = useState(localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards"))
    : []
  );

  const addMoreTermS = (values, moreTerm) => {
    moreTerm.insert(values.term + 1, {
      termName: "",
      termDefinition: "",
      termImage: "",
    });
    toast.info("Term Card Added !", {
      position: toast.POSITION.TOP_RIGHT, pauseOnFocusLoss: false
    });
  }

  return (
    <div className="w-[78%] m-auto mt-2 flex flex-col md:mt-10 " name="createFlashcardDiv">
      <ToastContainer />
      <Formik
        initialValues={formData} // Use formData from Redux store
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          flashCardData.push(values);
          localStorage.setItem("flashcards", JSON.stringify(flashCardData));
          console.log("FlashCard Created Successfully", flashCardData);
          toast.success("FlashCard Created Successfully", { theme: "colored", position: toast.POSITION.TOP_CENTER, pauseOnFocusLoss: false })
          resetForm({ values: "" });

        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <div className="bg-white w-[100%] h-[30%] p-[15px] flex flex-col text-left pl-[25px] rounded" name="createGroupDiv">
              <div className="flex flex-col md:flex-row "  >
                <div className="flex flex-col">
                  <label htmlFor="groupName"> Create Group*</label>
                  <Field
                    name="groupName"
                    id="groupName"
                    type="text"
                    placeholder="Group Name"
                    className="w-full md:w-96"
                  ></Field>
                  <ErrorMessage name="groupName">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                </div>

                <div>
                  {values.groupImage ? (
                    <div className="flex ">
                      <img
                        className="h-28 w-28 mx-7 text-center rounded-full  "
                        src={values.groupImage}
                        alt=""
                      />

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
                    onChange={(event) => {
                      // Validation on image
                      if (event.target.files[0] && !SUPPORTED_FORMATS.includes(event.target.files[0].type)) {
                        toast.warning("Please use Image Format !", { pauseOnFocusLoss: false });
                      }
                      else if (event.target.files[0].size > 1024 * 1024 * 10) {
                        toast.warning("Image size is very Large !", { pauseOnFocusLoss: false });
                      }
                      else if (event.target.files[0].size <= 1024 * 1024 * 10) {
                        const file = event.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setFieldValue("groupImage", reader.result);
                        };
                      }
                    }
                    }
                  />
                </div>

              </div>
              <div className="flex flex-col" name="groupDescriptionDiv">
                {/* Group Description */}
                <label htmlFor="groupDescription"> Add description</label>
                <Field
                  as="textarea"
                  name="groupDescription"
                  id="groupDescription"
                  placeholder="description "
                  className="w-full md:w-[70%] h-28 resize-none scrollbar-hide"
                ></Field>
                <ErrorMessage name="groupDescription">
                  {(emsg) => <div className="error ">{emsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            {/* Term Div */}
            <div className=" w-[100%] mt-3 pt-1 bg-white rounded flex flex-col text-left pl-[25px] " name='createTermCardDiv'>
              <FieldArray
                name="term"
                render={(moreTerm) => (
                  <div className="overflow-hidden bg-white rounded-md flex-col"  >
                    {values.term && values.term.map((term, index) => (
                      <div name="termsDiv"
                        className="mt-2 relative flex-wrap  w-full md:flex flex-row md:space-x-4 md:items-center border-gray-400"
                        key={index}>
                        <div className="w-8 h-8 px-2 text-xl text-center text-white bg-red-500 rounded-full  ">
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          {/* Term Name */}
                          <label htmlFor={`term.${index}.termName`}>
                            Enter Term*
                          </label>
                          <Field

                            className="p-2 text-sm text-gray-900 border rounded-md w-50 border-gray-400 md:w-72 bg-gray-50"
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
                            className="h-10 p-2  text-sm text-gray-700 transition-all duration-500 border-gray-400 border rounded-md resize-none w-full  focus:h-24 md:w-72 bg-gray-50 "
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

                        <div className="flex">
                          {/* Term Image */}
                          {term.termImage ? (
                            <div className=" flex">
                              <img
                                className="h-20 w-20 p-1 rounded-lg"
                                src={term.termImage}
                                alt=""
                              />
                              <GiCrossMark
                                className="text-lg hover:text-red-600 mr-5 "
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
                              <span className="flex w-32 p-2 mx-auto  font-bold text-blue-700 transition-all ease-in-out border border-blue-700 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white ">
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
                            {/*Visible Delete btn in term if more than one */}
                            {values.term.length <= 1 ? (
                              null
                            ) : (
                              <RiDeleteBin6Line
                                className="text-[1.8em]  text-gray-500 m-2 cursor-pointer hover:text-red-600"
                                onClick={() => {
                                  moreTerm.remove(index), toast.warn("Term Card Deleted !", {
                                    position: toast.POSITION.TOP_RIGHT, pauseOnFocusLoss: false
                                  });
                                }}
                              />
                            )}
                            {values.term.length <= 1 ? (
                              null
                            ) : (
                              <label htmlFor={`term.${index}.termName`}>
                                <BiEdit
                                  className="text-[1.8em] text-gray-500 m-2 cursor-pointer hover:text-yellow-600"
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div

                      className="inline-block mt-4 mb-6 mx-7 font-bold text-blue-700 cursor-pointer"
                      onClick={() => addMoreTermS(values, moreTerm)}
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
                className="absolute left-0 right-0 w-40 px-6 py-2 mx-auto mt-10 text-lg font-bold bg-red-500  text-white transition-all ease-in-out   border-red-500 rounded-lg shadow-lg bottom-1 hover:bg-red-600 hover:text-white hover:-translate-y-1 "
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