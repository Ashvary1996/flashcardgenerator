import * as Yup from "yup";

// This is a Validation Schema for Formik which is used to validate data inside the form field.
// We are also using Yup for giving extra validation.

const validationSchema = Yup.object({
  groupName: Yup.string()
    .min(3, "Group name must be min 3 character.")
    .max(20, "Group name must be between 3 - 20 character.")
    .required("Required!"),
  groupDescription: Yup.string()
    .min(20, "Description should be min 20 characters")
    .max(300, "Description allowed only upto 300 characters")
    .required("Required!"),

  term: Yup.array(
    Yup.object({
      termName: Yup.string()
        .min(3, "Term name must be min 3 characters")
        .max(20, "Term name must be within 20 characters")
        .required("Required!"),
      termDefinition: Yup.string()
        .min(20, "Defination should be min 20 characters")
        .max(500, "Defination conatin only upto 500 characters")
        .required("Required!"),
    })
  ),
});
export default validationSchema;
