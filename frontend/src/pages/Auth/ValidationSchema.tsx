import * as yup from "yup";

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  sex: yup.string().required("Sex is required"),
  birthdate: yup.object().shape({
    day: yup.string().required(),
    month: yup.string().required(),
    year: yup.string().required(),
  }),
  official_id_number: yup.string().required("ID number is required"),
  contactNumber: yup
    .string()
    .matches(/^[0-9]{10}$/, "Must be 10 digits")
    .required("Contact number is required"),
  address: yup.string().required("Municipality is required"),
});
