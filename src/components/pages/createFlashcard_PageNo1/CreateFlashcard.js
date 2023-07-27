import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { FaFileUpload } from "react-icons/fa";

const initialValues = {
  createGroup: "",
  addDescription: "",
  enterTerm: "",
  enterDefination: "",
};

const onSubmit = (values) => {
  console.log("Formik values", values);
  // console.log("Formik values", values.createGroup);
};

const validationSchema = Yup.object({
  createGroup: Yup.string()
    .min(3, "Group name must be min 3 character.")
    .max(10, "Group name must be between 3 - 10 character.")
    .required("Required!"),
  addDescription: Yup.string()
    .min(10, "Description should be min 10 characters")
    .max(400, "Description allowed only upto 400 characters")
    .required("Required!"),
  enterTerm: Yup.string()
    .min(3, "Term name must be min 10 characters")
    .max(10, "Term name must be within 10 characters")
    .required("Required!"),
  enterDefination: Yup.string()
    .min(10, "Defination should be min 10 characters")
    .max(400, "Defination conatin only upto 200 characters")
    .required("Required!"),
});
// document.getElementById("termDiv").disabled = true;

function CreateFlashcard() {
  return (
    <div className="mainComponent m-auto my-10  ">
      <div className=" fullformikDiv ">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="flex-col">
            <div className="createGroupDiv commonDiv ">
              <div className=" flex flex-row gap-8 relative ">
                <div className="form-control w-[50%]  ">
                  <label htmlFor="createGroup">Create Group*</label>
                  <Field
                    className="w-[80%]"
                    type="text"
                    name="createGroup"
                    id="createGroup"
                  ></Field>
                  <ErrorMessage name="createGroup">
                    {(emsg) => <div className="error ">{emsg}</div>}
                  </ErrorMessage>
                </div>
                {/* /////////////////Group Image////////////////////////// */}
                <div className="border-2 rounded-[4px] border-grey-400 flex flex-row items-center h-10  absolute top-[26.5px] left-[50%] justify-around ">
                  <div className="pl-4">
                    <FaFileUpload color="blue" size="20px" />
                  </div>
                  <div>
                    <input type="file" id="upload-btn" hidden />
                    <label
                      className="text-center m-auto p-5 text-blue-600   cursor-pointer"
                      for="upload-btn"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>
              </div>
              {/* ///////////////////////////////////////////////////////////// */}
              <div className="form-control  ">
                <label htmlFor="addDescription">Add Description</label>
                <Field
                  className="w-[80%] h-32 pt-1"
                  as="textarea"
                  name="addDescription"
                  id="addDescription"
                ></Field>
                <ErrorMessage name="addDescription">
                  {(emsg) => <div className="error  ">{emsg}</div>}
                </ErrorMessage>
              </div>
            </div>

            {/* /////////////// TERM dIV ///////////////////////////STARTED */}
            <br />

            <div className=" createTerm Div commonDiv  " id="termDiv">
              <p>
                <div className="flex justify-around">
                  <div className="bg-orange-400 h-8 w-8 rounded-full text-white text-center p-1">
                    1
                  </div>
                  <div className="form-control w-1/3">
                    <label htmlFor="enterTerm">Enter Term*</label>
                    <Field
                      className="w-[100%] h-8"
                      type="text"
                      name="enterTerm"
                      id="enterTerm"
                    ></Field>
                    <ErrorMessage name="enterTerm">
                      {(emsg) => <div className="error  ">{emsg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="form-control w-1/3  mx-5">
                    <label htmlFor="enterDefination">Enter Defination*</label>
                    <Field
                      className="w-[100%] h-16"
                      as="textarea"
                      name="enterDefination"
                      id="enterDefination"
                    ></Field>
                    <ErrorMessage name="enterDefination">
                      {(emsg) => <div className="error  ">{emsg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="form-control">
                    <div>
                      <input type="file" id="actual-btn" hidden />
                      <label
                        className="text-center m-auto p-5 text-blue-600  font-medium	cursor-pointer"
                        for="actual-btn"
                      >
                        Select Image
                      </label>
                    </div>
                    <div className="flex w-44 ">
                      <div>
                        <img
                          className="w-33 h-20 p-1"
                          src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
                          alt=""
                        />
                      </div>
                      <div className="mx-2 m-auto ">
                        <div className="cursor-pointer my-2 text-gray-500">
                          <RiDeleteBinLine size="1.5rem" />
                        </div>
                        <div className="cursor-pointer text-blue-700">
                          <TbEdit size="1.5rem" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </p>
              {/* <div> Add more button will come here</div> */}
            </div>

            {/* ///////////////////////////////       Create Button               /////////////////////////////////////////////////// */}
            <button
              type="submit"
              className="m-auto bg-red-600 text-white p-2 pl-14 pr-14 my-5 text-base text-center  font-medium rounded-sm relative top-26"
            >
              Create
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CreateFlashcard;
