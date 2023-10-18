import * as Yup from "yup";

const validationSchema = Yup.object({
  groupName: Yup.string()
    .min(3, "Group name must be min 3 character.")
    .max(20, "Group name must be between 3 - 20 character.")
    .required("Required!"),
  groupDescription: Yup.string()
    .min(20, "Description should be min 20 characters")
    .max(300, "Description allowed only upto 400 characters")
    .required("Required!"),
  // groupImage: Yup.string().required("Image Required!"),

  term: Yup.array(
    Yup.object({
      termName: Yup.string()
        .min(3, "Term name must be min 3 characters")
        .max(20, "Term name must be within 20 characters")
        .required("Required!"),
      termDefinition: Yup.string()
        .min(3, "Defination should be min 3 characters")
        .max(400, "Defination conatin only upto 400 characters")
        .required("Required!"),
      // termImage: Yup.string().required("Image Required!"),
    })
  ),
});
export default validationSchema;
