import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdCheckboxOutline, IoIosAt } from "react-icons/io";
import { GoLock } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdCalendarToday,
} from "react-icons/md";

import Municipalities from "../../assets/json/Municipalites.json";

import { Input, Select } from "../../Components/UIComponents";
import { useAuthHook } from "../../hooks";

interface Signup {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  sex: string;
  contactNumber: string;
  municipality: string;
  affiliation: string;
  officeName: string;
  officeAddress: string;
  division: string;
  positionTitle: string;
}

interface ShowPassword {
  password: boolean;
  confirmPassword: boolean;
}

interface Municipality {
  label: string;
  value: string;
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState({ day: "", month: "", year: "" });
  const [municipalitiesSearch, setMunicipalitiesSearch] = useState<string>("");
  const [showPassword, setShowPassword] = useState<ShowPassword>({
    password: false,
    confirmPassword: false,
  });
  const [counter, setCounter] = useState<number>(1);
  const { handleSignup, isLoading } = useAuthHook();
  const [signupCredentials, setSignupCredentials] = useState<Signup>({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    sex: "",
    contactNumber: "",
    municipality: "",
    affiliation: "",
    officeName: "",
    officeAddress: "",
    division: "",
    positionTitle: "",
  });

  const months = [
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

  const affiliation = [
    { label: "Select Affiliation", value: "" },
    {
      label: "Employed - Government - Regular",
      value: "Employed - Government - Regular",
    },
    {
      label: "Employed - Government - Contractual(CSC)",
      value: "Employed - Government - Contractual(CSC)",
    },
    { label: "Private Freelancer", value: "Private Freelancer" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => {
    const year = currentYear - index;
    return { label: year.toString(), value: year.toString() };
  });

  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrement = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      first_name: signupCredentials.firstname,
      last_name: signupCredentials.lastname,
      email: signupCredentials.email,
      sex: signupCredentials.sex,
      birth_date: `${date.year}-${date.month}-${date.day}`,
      address: signupCredentials.municipality,
      contact: signupCredentials.contactNumber,
      password: signupCredentials.password,
      affiliation: signupCredentials.affiliation,
      office_name: signupCredentials.officeName,
      office_address: signupCredentials.officeAddress,
      division: signupCredentials.division,
      position_title: signupCredentials.positionTitle,
    };
    await handleSignup(data);
  };

  return (
    <form
      onSubmit={signup}
      className="w-4/5 h-full py-10 flex flex-col justify-between"
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
                  value={signupCredentials.email}
                  onChange={(e) =>
                    setSignupCredentials({
                      ...signupCredentials,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter valid email address"
                />
              </div>
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
                  value={signupCredentials.password}
                  onChange={(e) =>
                    setSignupCredentials({
                      ...signupCredentials,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter your password"
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
                  value={signupCredentials.confirmPassword}
                  onChange={(e) =>
                    setSignupCredentials({
                      ...signupCredentials,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm your password"
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
            </div>
            <div className="w-full flex gap-5">
              <div className="w-1/2 flex flex-col">
                <label className="mb-1">Firstname</label>
                <Input
                  type="text"
                  styling="tertiary"
                  value={signupCredentials.firstname}
                  placeholder="Enter your firstname"
                  onChange={(e) =>
                    setSignupCredentials({
                      ...signupCredentials,
                      firstname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <label className="mb-1">Lastname</label>
                <Input
                  type="text"
                  styling="tertiary"
                  value={signupCredentials.lastname}
                  placeholder="Enter you lastname"
                  onChange={(e) =>
                    setSignupCredentials({
                      ...signupCredentials,
                      lastname: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
        {counter === 2 && (
          <div className="w-full h-fit text-f-dark flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="mb-1">Sex</label>
              <Select
                value={signupCredentials.sex}
                onChange={(e) =>
                  setSignupCredentials({
                    ...signupCredentials,
                    sex: e.target.value,
                  })
                }
                options={sex}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Birthdate</label>
              <div className="w-full flex gap-2">
                <div className="w-1/5">
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    placeholder={date.day}
                    onChange={(e) => setDate({ ...date, day: e.target.value })}
                    styling="tertiary"
                  />
                </div>
                <div className="w-2/5">
                  <Select
                    value={date.month}
                    onChange={(e) =>
                      setDate({ ...date, month: e.target.value })
                    }
                    options={months}
                  />
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
              <label className="mb-1">Contact Number</label>
              <div className="flex flex-row gap-2">
                <div className="w-fit flex items-center justify-center gap-2 bg-c-grey-5 rounded-md px-3">
                  <p className="text-c-grey-50">+63</p>
                </div>
                <div className="w-full">
                  <Input
                    type="number"
                    placeholder="9123456789"
                    styling="tertiary"
                    value={signupCredentials.contactNumber}
                    onChange={(e) =>
                      setSignupCredentials({
                        ...signupCredentials,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Municipality (Region-4A)</label>
              <div className="relative">
                <Input
                  type="text"
                  value={signupCredentials.municipality}
                  placeholder="Select Municipality"
                  styling="tertiary"
                  onChange={(e) => {
                    setMunicipalitiesSearch(e.target.value);
                    setSignupCredentials({
                      ...signupCredentials,
                      municipality: e.target.value,
                    });
                  }}
                />
                {municipalitiesSearch && (
                  <div className="w-full p-2 absolute left-0 bg-white">
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
                            className="text-left"
                            onClick={() => {
                              setSignupCredentials({
                                ...signupCredentials,
                                municipality: municipality.value,
                              });
                              setMunicipalitiesSearch("");
                            }}
                          >
                            {municipality.label}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {counter === 3 && (
          <div className="w-full h-fit text-f-dark flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="mb-1">Affiliation</label>
              <Select
                value={signupCredentials.sex}
                onChange={(e) =>
                  setSignupCredentials({
                    ...signupCredentials,
                    affiliation: e.target.value,
                  })
                }
                options={affiliation}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Office Name</label>
              <Input
                type="text"
                styling="tertiary"
                placeholder=""
                onChange={(e) =>
                  setSignupCredentials({
                    ...signupCredentials,
                    officeName: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Office Address</label>
              <Input
                type="text"
                styling="tertiary"
                placeholder=""
                onChange={(e) =>
                  setSignupCredentials({
                    ...signupCredentials,
                    officeAddress: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">
                Division / Department / Cluster / Section / Unit
              </label>
              <Input
                type="text"
                styling="tertiary"
                placeholder=""
                onChange={(e) =>
                  setSignupCredentials({
                    ...signupCredentials,
                    division: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1">
                Official Position Title(Appointment / Contract)
              </label>
              <Input
                type="text"
                styling="tertiary"
                placeholder=""
                onChange={(e) =>
                  setSignupCredentials({
                    ...signupCredentials,
                    positionTitle: e.target.value,
                  })
                }
              />
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
          {counter === 3 ? (
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2 bg-c-green-50 text-f-light rounded-md font-medium"
            >
              Sign up
            </button>
          ) : (
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
    </form>
  );
};

export default SignupPage;
