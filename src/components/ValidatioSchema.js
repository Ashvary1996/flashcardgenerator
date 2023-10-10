import * as Yup from "yup";

const validationSchema = Yup.object({
  groupName: Yup.string()
    .min(1, "Group name must be min 3 character.")
    .max(10, "Group name must be between 3 - 10 character.")
    .required("Required!"),
  groupDescription: Yup.string()
    .min(1, "Description should be min 10 characters")
    .max(400, "Description allowed only upto 400 characters")
    .required("Required!"),
  // groupImage: Yup.string().required("Image Required!"),

  term: Yup.array(
    Yup.object({
      termName: Yup.string()
        .min(1, "Term name must be min 103 characters")
        .max(10, "Term name must be within 10 characters")
        .required("Required!"),
      termDefinition: Yup.string()
        .min(1, "Defination should be min 10 characters")
        .max(400, "Defination conatin only upto 400 characters")
        .required("Required!"),
      // termImage: Yup.string().required("Image Required!"),
    })
  ),
});
export default validationSchema;
