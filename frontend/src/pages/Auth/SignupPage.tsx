import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Icons
import { IoMdCheckboxOutline, IoIosAt } from "react-icons/io";
import { GoLock } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdCalendarToday,
} from "react-icons/md";

import Municipalities from "../../assets/json/Municipalites.json";
import { MessageBox } from "../../Components";
import { Input, Select } from "../../Components/UIComponents";
import { useAuthHook } from "../../hooks";

interface ShowPassword {
  password: boolean;
  confirmPassword: boolean;
}

interface Municipality {
  label: string;
  value: string;
}

const signupSchema = yup.object({
  // Step 1: Login Credentials
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),

  // Step 2: Personal Information
  sex: yup.string().required("Sex is required"),

  birthdate: yup.date().required("Birthdate is required"),
  official_id_number: yup.string()
    .required("Official ID number is required")
    .min(6, "Official ID Number must be at least 6 numbers long")
    .max(6, "Official ID Number must be at least 6 numbers long"),
  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number"),
  address: yup.string().required("Address is required"),

  // Step 3: Affiliation
  affiliation: yup.string().required("Affiliation is required"),
  officeName: yup.string().required("Office name is required"),
  officeAddress: yup.string().required("Office address is required"),
  department: yup.string().required("Department is required"),
  designation: yup.string().required("Designation is required"),
});

type SignupForm = yup.InferType<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState({ day: "", month: "", year: "" });
  const [municipalitiesSearch, setMunicipalitiesSearch] = useState<string>("");
  const [municipalitiesSearchFlag, setMunicipalitiesSearchFlag] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    password: false,
    confirmPassword: false,
  });
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<{
    status: "success" | "error" | "warning" | "info" | "";
    title: string;
    message: string;
  }>({
    status: "",
    title: "",
    message: "",
  });
  const [counter, setCounter] = useState<number>(1);
  const { handleSignup, isLoading } = useAuthHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<SignupForm>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const months = [
    { label: "Select a Month", value: "" },
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const sex = [
    { label: "Select Sex", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const officeName = [
    { label: "Select Office", value: "" },
    { label: "Regional Office", value: "Regional Office" },
    { label: "Laguna-Rizal IMO", value: "Laguna-Rizal IMO" },
    { label: "Batangas-Cavite IMO", value: "Batangas-Cavite IMO" },
    { label: "Quezon IMO", value: "Quezon IMO" },
  ];

  const affiliation = [
    { label: "Select Affiliation", value: "" },
    {
      label: "Employed - Government - Regular",
      value: "Employed - Government - Regular",
    },
    {
      label: "Employed - Government - Contractual (CSC)",
      value: "Employed - Government - Contractual (CSC)",
    },
    {
      label: "Employed - Government - Contract of Service / Job Order",
      value: "Employed - Government - Contract of Service / Job Order",
    },
    {
      label: "Employed - Government - Casual",
      value: "Employed - Government - Casual",
    },
    {
      label: "Employed - Government - Temporary",
      value: "Employed - Government - Temporary",
    },
    {
      label: "Employed - Government - Co-terminous",
      value: "Employed - Government - Co-terminous",
    },
    {
      label: "Seconded / Detailed from another agency",
      value: "Seconded / Detailed from another agency",
    },
  ];

  const currentYear = new Date().getFullYear();
  const years = [
    { label: "Select a Year", value: "" },
    ...Array.from({ length: currentYear - 1900 + 1 }, (_, index) => {
      const year = currentYear - index;
      return { label: year.toString(), value: year.toString() };
    }),
  ];

  useEffect(() => {
    if (date.day && date.month && date.year) {
      setValue("birthdate", new Date(`${date.year}-${date.month}-${date.day}`));
    }
  }, [date, setValue]);

  const increment = async () => {
    let isValid = false;

    if (counter === 1) {
      isValid = await trigger([
        "email",
        "password",
        "confirmPassword",
        "firstname",
        "lastname",
      ]);
    } else if (counter === 2) {
      isValid = await trigger([
        "sex",
        "birthdate",
        "official_id_number",
        "contactNumber",
        "address",
      ]);
    }

    if (isValid) {
      setCounter((prev) => prev + 1);
    } else {
      setShowMessageBox(true);
      setMessageInfo({
        status: "error",
        title: "Validation Error",
        message:
          "Please fill in all required fields correctly before continuing.",
      });
      setTimeout(() => setShowMessageBox(false), 2000);
    }
  };

  const decrement = () => {
    setCounter((prev) => prev - 1);
  };

  const onSubmit = async (data: SignupForm) => {
    const formattedData = {
      first_name: data.firstname,
      last_name: data.lastname,
      email: data.email,
      sex: data.sex,
      official_id_number: data.official_id_number,
      birth_date: data.birthdate.toISOString().split("T")[0],
      address: data.address,
      contact: data.contactNumber,
      password: data.password,
      affiliation: data.affiliation,
      office_name: data.officeName,
      office_address: data.officeAddress,
      department: data.department,
      designation: data.designation,
    };

    const res = await handleSignup(formattedData);
    if(res) {
      setShowMessageBox(true);
      setMessageInfo({
        status: "success",
        title: "Registration Successful",
        message: "Please your email to verify your account.",
      });
      setTimeout(() => {
        setShowMessageBox(false);
        navigate("/");
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-4/5 h-full py-10 flex flex-col justify-between overflow-y-auto p-2"
    >
      <section className="w-full h-auto flex flex-col">
        <h1 className="text-h-h4 font-medium">Acount Registration</h1>
        <div className="flex text-p-sm mt-2">
          <div className="flex flex-col items-start">
            <IoMdCheckboxOutline className="text-c-blue-50" size={24} />
            <h6 className="text-left text-c-blue-50  font-medium">
              Login <br /> Credentials
            </h6>
          </div>
          <hr
            className={`${
              counter >= 2 ? "border-blue-500" : "border-f-gray"
            } w-1/5 border mt-3 -ml-10 mr-2`}
          ></hr>
          <div className="flex flex-col items-start">
            <IoMdCheckboxOutline
              className={`${counter >= 2 ? "text-c-blue-50" : "text-f-gray"}`}
              size={24}
            />
            <h6
              className={`${
                counter >= 2 ? "text-c-blue-50 font-medium" : "text-f-gray"
              } text-left`}
            >
              Personal <br /> Information
            </h6>
          </div>
          <hr
            className={`${
              counter >= 3 ? "border-blue-500" : "border-f-gray"
            } w-1/5 border mt-3 -ml-10 mr-2`}
          ></hr>
          <div className="flex flex-col items-start">
            <IoMdCheckboxOutline
              className={`${counter >= 3 ? "text-c-blue-50" : "text-f-gray"}`}
              size={24}
            />
            <h6
              className={`${
                counter >= 3 ? "text-c-blue-50 font-medium" : "text-f-gray"
              } text-left`}
            >
              Affiliation
            </h6>
          </div>
        </div>
      </section>
      <section className="w-full h-fit">
        {counter === 1 && (
          <div className="w-full h-fit text-f-dark flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="mb-1">Email Address</label>
              <div className="relative w-auto h-auto">
                <IoIosAt
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                  size={24}
                />
                <Input
                  type="email"
                  styling="secondary"
                  {...register("email")}
                  placeholder="Enter valid email address"
                  error={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Password</label>
              <div className="relative w-auto h-auto">
                <GoLock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                  size={24}
                />
                <Input
                  type={showPassword.password ? "text" : "password"}
                  styling="primary"
                  {...register("password")}
                  placeholder="Enter your password"
                  error={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                >
                  {showPassword.password ? (
                    <FiEyeOff
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                      size={24}
                    />
                  ) : (
                    <FiEye
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                      size={24}
                    />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Confirm Password</label>
              <div className="relative w-auto h-auto">
                <GoLock
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                  size={24}
                />
                <Input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  styling="primary"
                  {...register("confirmPassword")}
                  placeholder="Enter your password"
                  error={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                >
                  {showPassword.confirmPassword ? (
                    <FiEyeOff
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                      size={24}
                    />
                  ) : (
                    <FiEye
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                      size={24}
                    />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="w-full flex gap-5">
              <div className="w-1/2 flex flex-col">
                <label className="mb-1">Firstname</label>
                <Input
                  type="text"
                  styling="tertiary"
                  {...register("firstname")}
                  placeholder="Enter your firstname"
                  error={!!errors.firstname}
                />
                {errors.firstname && (
                  <p className="text-p-sm text-red-500 mt-1">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="w-1/2 flex flex-col">
                <label className="mb-1">Lastname</label>
                <Input
                  type="text"
                  styling="tertiary"
                  {...register("lastname")}
                  placeholder="Enter your lastname"
                  error={!!errors.lastname}
                />
                {errors.lastname && (
                  <p className="text-p-sm text-red-500 mt-1">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {counter === 2 && (
          <div className="w-full h-fit text-f-dark flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="mb-1">Sex</label>
              <select
                {...register("sex")}
                className={`w-full p-3 rounded-md focus:outline-green-950 border ${
                  errors.sex ? "border-red-500" : " border-f-gray"
                }`}
                defaultValue=""
              >
                {sex.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.sex && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sex.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Birthdate</label>
              <div className="w-full flex gap-2">
                <div className="w-1/5">
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    value={date.day}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (value >= 1 && value <= 31) {
                        setDate({ ...date, day: e.target.value })
                      } else {
                        setDate({ ...date, day: '' }); 
                      }
                    }}
                    styling="tertiary"
                  />
                </div>
                <div className="w-2/5">
                  <select
                    value={date.month}
                    onChange={(e) => {
                      setDate({ ...date, month: e.target.value });
                      setValue(
                        "birthdate",
                        new Date(`${date.year}-${e.target.value}-${date.day}`),
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                    className={`w-full p-3 rounded-md focus:outline-green-950 border ${
                      errors.birthdate ? "border-red-500" : " border-f-gray"
                    }`}
                  >
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  {errors.birthdate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.birthdate.message}
                    </p>
                  )}
                </div>
                <div className="w-2/5">
                  <Select
                    value={date.year}
                    onChange={(e) => setDate({ ...date, year: e.target.value })}
                    options={years}
                  />
                </div>
                <button type="button" className="w-fit px-2 relative">
                  <MdCalendarToday className="text-f-gray" size={24} />
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Official ID Number</label>
              <div className="w-full">
                <Input
                  type="text"
                  styling="tertiary"
                  {...register("official_id_number")}
                  error={!!errors.official_id_number}
                />
                {errors.official_id_number && (
                  <p className="text-p-sm text-red-500 mt-1">
                    {errors.official_id_number.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Contact Number</label>
              <div className="flex flex-row gap-2">
                <div className="w-full">
                  <Input
                    type="text"
                    styling="tertiary"
                    {...register("contactNumber")}
                    placeholder="9123456789"
                    error={!!errors.contactNumber}
                  />
                </div>
              </div>
              {errors.contactNumber && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Municipality (Region-4A)</label>
              <div className="relative">
                <Input
                  type="text"
                  {...register("address")}
                  value={municipalitiesSearch}
                  placeholder="Select Municipality"
                  styling="tertiary"
                  error={!!errors.address}
                  onChange={(e) => {
                    setMunicipalitiesSearch(e.target.value);
                    setMunicipalitiesSearchFlag(true);
                    setValue("address", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
                {(municipalitiesSearch && municipalitiesSearchFlag) && (
                  <div className="w-full p-2 absolute left-0 bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
                    <div className="flex flex-col">
                      {Municipalities.region4A
                        .filter((municipality: Municipality) =>
                          municipality.label
                            .toLowerCase()
                            .includes(municipalitiesSearch.toLowerCase())
                        )
                        .map((municipality: Municipality) => (
                          <button
                            type="button"
                            key={municipality.value}
                            className="text-left p-2 hover:bg-gray-100"
                            onClick={() => {
                              setValue("address", municipality.value, {
                                shouldValidate: true,
                              });
                              setMunicipalitiesSearchFlag(false);
                              setMunicipalitiesSearch(municipality.label);
                            }}
                          >
                            {municipality.label}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              {errors.address && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
        )}
        {counter === 3 && (
          <div className="w-full h-fit text-f-dark flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="mb-1">Affiliation</label>
              <select
                {...register("affiliation", {
                  required: "Affiliation is required",
                })}
                className={`w-full p-3 rounded-md focus:outline-green-950 border  ${
                  errors.affiliation ? "border-red-500" : "border-f-gray"
                }`}
                defaultValue=""
              >
                {affiliation.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.affiliation && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.affiliation.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Office Name</label>
              <select
                {...register("officeName", {
                  required: "Office name is required",
                })}
                className={`w-full p-3 rounded-md focus:outline-green-950 border  ${
                  errors.officeName ? "border-red-500" : "border-f-gray"
                }`}
                defaultValue=""
              >
                {officeName.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.officeName && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.officeName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Office Address</label>
              <Input
                type="text"
                styling="tertiary"
                {...register("officeAddress")}
                error={!!errors.officeAddress}
              />
              {errors.officeAddress && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.officeAddress.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">
                Division / Department / Cluster / Section / Unit
              </label>
              {/* <Input
                type="text"
                styling="tertiary"
                {...register("department")}
                error={!!errors.department}
              /> */}
              <select
                {...register("department", {
                  required: "Department is required",
                })}
                className={`w-full p-3 rounded-md focus:outline-green-950 border  ${
                  errors.department ? "border-red-500" : "border-f-gray"
                }`}
                defaultValue="">
                <option value="" disabled>Select Department</option>
                <option value="RO" >RO</option>
                <option value="EOD" >EOD</option>
                <option value="AFD" >AFD</option>
              </select>
              {errors.department && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Designation</label>
              <Input
                type="text"
                styling="tertiary"
                {...register("designation")}
                error={!!errors.designation}
              />
              {errors.designation && (
                <p className="text-p-sm text-red-500 mt-1">
                  {errors.designation.message}
                </p>
              )}
            </div>
          </div>
        )}
        <div
          className={`flex mt-10 ${
            counter === 1 ? "justify-end" : "justify-between"
          }`}
        >
          {counter === 1 ? (
            " "
          ) : (
            <button
              onClick={decrement}
              type="button"
              className="px-3 py-2 flex items-center font-medium h-fit"
            >
              <MdOutlineKeyboardArrowLeft size={24} />
              Back
            </button>
          )}
          {counter === 3 && (
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-c-green-50 text-f-light rounded-md font-medium"
            >
              Sign up
            </button>
          )}
          {counter !== 3 && (
            <button
              type="button"
              onClick={increment}
              className="px-3 py-2 bg-c-blue-50 text-f-light rounded-md flex items-center font-medium h-fit"
            >
              Continue <MdOutlineKeyboardArrowRight size={24} />
            </button>
          )}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center pb-10">
        <p className="text-f-gray">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-f-green font-medium"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </section>
      {showMessageBox && (
        <MessageBox
          status={messageInfo.status}
          title={messageInfo.title}
          message={messageInfo.message}
        />
      )}
    </form>
  );
};

export default SignupPage;
