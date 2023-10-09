import React, { useState, useRef } from "react";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
function CreateFlashCard() {
  const formData = {
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
  };

  const validationSchema = Yup.object({
    groupName: Yup.string()
      .min(3, "Group name must be min 3 character.")
      .max(10, "Group name must be between 3 - 10 character.")
      .required("Required!"),
    groupDescription: Yup.string()
      .min(10, "Description should be min 10 characters")
      .max(400, "Description allowed only upto 400 characters")
      .required("Required!"),

    term: Yup.array(
      Yup.object({
        termName: Yup.string()
          .min(3, "Term name must be min 103 characters")
          .max(10, "Term name must be within 10 characters")
          .required("Required!"),
        termDefinition: Yup.string()
          .min(10, "Defination should be min 10 characters")
          .max(400, "Defination conatin only upto 400 characters")
          .required("Required!"),
      })
    ),
  });

  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };
  return (
    <div>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: "" });
          console.log("FormValues", values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <>
            <Form>
              <div>
              <div className="createFlashcardDiv">
                <label htmlFor="groupName"> Create Group*</label>
                <Field
                  name="groupName"
                  id="groupName"
                  type="text"
                  placeholder="Group Name"
                  className="w-[30%]"
                ></Field>
                <ErrorMessage name="groupName">
                  {(emsg) => <div className="error ">{emsg}</div>}
                </ErrorMessage>

                <div className="w-20 h-20"onClick={handleImageClick}  >
                {image ? (
                  <img src={URL.createObjectURL(image)} alt=""  className=".img-display-after"/>
                ) : (
                  <img src="" alt="" className=".img-display-before" 
                  />
                )}
                <label htmlFor='image'
                className="flex w-32 p-2 mx-auto mt-5 text-blue-700 transition-all ease-in-out border border-blue-600 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white"
                >Select Image</label>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  className="hidden w-12 h-12"
                  sizes={"1.25vw"}
                  hidden
                  
                />

              </div>
                </div>
                <label htmlFor="groupDescription"> Add description</label>
                <Field
                  as="textarea"
                  name="groupDescription"
                  id="groupDescription"
                  placeholder="description "
                  className="w-[70%]"
                ></Field>
                <ErrorMessage name="groupDescription">
                  {(emsg) => <div className="error ">{emsg}</div>}
                </ErrorMessage>
              </div>

              {/* Term Div ///////////////////////////*/}
              <div className="myFlashcardDiv">
                <FieldArray
                  name="term"
                  render={(moreTerm) => (
                    <div>
                      {values.term.map((term, index) => (
                        <div className="termsDiv" key={index}>
                          <div className="p-4 text-xl text-white bg-red-600 rounded-full ">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor={`term.${index}.termName`}>
                              Enter Term*
                            </label>
                            <Field
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

                          <div className="flex flex-col">
                            <label htmlFor={`term.${index}.termDefinition`}>
                              Enter Definition*
                            </label>
                            <Field
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
                        </div>
                      ))}

                      <div
                        onClick={() => {
                          moreTerm.insert(values.term.length + 1, {
                            termName: "",
                            termDefinition: "",
                            termImage: "",
                          });
                        }}
                      >
                        Add More
                      </div>
                    </div>
                  )}
                ></FieldArray>
              </div>
              <button type="submit">Create</button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default CreateFlashCard;
