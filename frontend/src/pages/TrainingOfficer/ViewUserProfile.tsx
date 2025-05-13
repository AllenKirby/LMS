import { PageSpacing } from "../../assets/Util/Spacing";
import { DPButton } from "../../assets/Util/ButtonStyle";
import { defaultInput } from "../../assets/Util/InputStyle";
import Ph from "../../assets/Ph.jpg";
import { MdCalendarToday } from "react-icons/md";

import { useEffect, useState } from "react";
import { useTraineeHook } from "../../hooks";
import { useSelector } from "react-redux";
import { UserState } from "../../types/UserTypes";
import Municipalities from "../../assets/json/Municipalites.json";
import { MessageBox } from "../../Components";

import { Input, Select } from "../../Components/UIComponents";

interface Municipality {
  label: string;
  value: string;
}

interface ValidationErrors {
  first_name?: string;
  last_name?: string;
  official_id_number?: string;
  sex?: string;
  birth_date?: string;
  address?: string;
  contact?: string;
  email?: string;
  affiliation?: string;
  office_name?: string;
  office_address?: string;
  department?: string;
  position_title?: string;
  password?: string;
  confirmPassword?: string;
}

const ViewUserProfile = () => {
  const [activeTab, setActiveTab] = useState<string>("Personal Information");
  const [activeSection, setActiveSection] = useState<string>("User Profile");
  const [municipalitiesSearch, setMunicipalitiesSearch] = useState<string>("");
  const [date, setDate] = useState({ day: "", month: "", year: "" });
  const { tab: tabStyle, section: sectionStyle } = DPButton;
  const { getUserInfo, validatePassword, updateUserData } = useTraineeHook();
  const user = useSelector((state: { user: UserState }) => state.user);
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
  const [passwordStatus, setPasswordStatus] = useState<{
    message: string;
    correct: boolean;
  }>({
    message: "",
    correct: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [userData, setUserData] = useState<{
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
    sex: string;
    official_id_number: string;
    contact: string;
    address: string;
    affiliation: string;
    office_name: string;
    office_address: string;
    department: string;
    position_title: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    sex: "",
    official_id_number: "",
    contact: "",
    address: "",
    affiliation: "",
    office_name: "",
    office_address: "",
    department: "",
    position_title: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      const response = await getUserInfo(user.user.id);
      if (response) {
        setUserData(response);
        console.log(response);
        const [year, month, day] = response.birth_date.split("-");
        console.log(year, month, day);
        setDate({
          year: year,
          month: month,
          day: day,
        });
      }
    };
    getUserData();
  }, []);

  const validatePersonalInfo = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!userData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!userData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!userData.official_id_number.trim()) {
      newErrors.official_id_number = "Official ID number is required";
    }

    if (!userData.sex) {
      newErrors.sex = "Gender is required";
    }

    if (!date.day || !date.month || !date.year) {
      newErrors.birth_date = "Birthdate is required";
    }

    if (!userData.address) {
      newErrors.address = "Municipality is required";
    }

    if (!userData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(userData.contact)) {
      newErrors.contact = "Contact number must be 10 digits";
    }

    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAffiliation = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!userData.affiliation) {
      newErrors.affiliation = "Affiliation is required";
    }

    if (!userData.office_name) {
      newErrors.office_name = "Office name is required";
    }

    if (!userData.office_address.trim()) {
      newErrors.office_address = "Office address is required";
    }

    if (!userData.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!userData.position_title.trim()) {
      newErrors.position_title = "Position title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordFields = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!userData.password) {
      newErrors.password = "New password is required";
    } else if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!userData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const currentYear = new Date().getFullYear();
  const years = [
    { label: "Select a Year", value: "" },
    ...Array.from({ length: currentYear - 1900 + 1 }, (_, index) => {
      const year = currentYear - index;
      return { label: year.toString(), value: year.toString() };
    }),
  ];

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

  const officeName = [
    { label: "Select Office", value: "" },
    { label: "Regional Office", value: "Regional Office" },
    { label: "Laguna-Rizal IMO", value: "Laguna-Rizal IMO" },
    { label: "Batangas-Cavite IMO", value: "Batangas-Cavite IMO" },
    { label: "Quezon IMO", value: "Quezon IMO" },
  ];

  const sex = [
    { label: "Select Sex", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const handleUpdatePassword = async () => {
    if (!validatePasswordFields()) return;

    const passwordsFilled = !!userData.password && !!userData.confirmPassword;
    const passwordsMatch = userData.password === userData.confirmPassword;
    const passwordValid =
      passwordStatus.correct && passwordStatus.message === "Password Match!";

    if (passwordsFilled && passwordsMatch && passwordValid) {
      const data = {
        password: userData.password,
      };
      const res = await updateUserData(data, user.user.id);
      if (res) {
        setShowMessageBox(true);
        setMessageInfo({
          status: "success",
          title: "Password Updated",
          message: "Your password has been successfully updated",
        });
        setTimeout(() => {
          setShowMessageBox(false);
        }, 2000);
      }
    }
  };

  const handleUpdatePersonalInformation = async () => {
    if (!validatePersonalInfo()) return;

    const data = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      official_id_number: userData.official_id_number,
      birth_date: `${date.year}-${date.month}-${date.day}`,
      sex: userData.sex,
      municipality: userData.address,
      contact: userData.contact,
      email: userData.email,
    };
    const res = await updateUserData(data, user.user.id);
    if (res) {
      setShowMessageBox(true);
      setMessageInfo({
        status: "success",
        title: "Profile Updated",
        message: "Your profile has been successfully updated",
      });
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
    }
  };

  const handleUpdateAffiliation = async () => {
    if (!validateAffiliation()) return;

    const data = {
      affiliation: userData.affiliation,
      office_name: userData.office_name,
      office_address: userData.office_address,
      department: userData.department,
      position_title: userData.position_title,
    };

    const isNotEmpty = Object.values(data).every(
      (item) =>
        item !== null && item !== undefined && String(item).trim() !== ""
    );
    if (isNotEmpty) {
      const res = await updateUserData(data, user.user.id);
      if (res) {
        setShowMessageBox(true);
        setMessageInfo({
          status: "success",
          title: "Profile Updated",
          message: "Your profile has been successfully updated",
        });
        setTimeout(() => {
          setShowMessageBox(false);
        }, 2000);
      }
    } else {
      setShowMessageBox(true);
      setMessageInfo({
        status: "error",
        title: "Missing Required Fields",
        message: "Please fill in all required fields before continuing.",
      });
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
    }
  };

  const checkCurrentPassword = async (currentPassword: string) => {
    const res = await validatePassword({
      email: userData.email,
      password: currentPassword,
    });
    console.log(res);
    if (res.correct && res.message === "Password Match!") {
      setPasswordStatus(res);
      setShowMessageBox(true);
      setMessageInfo({
        status: "success",
        title: "Password Matched",
        message: "Current Password is correct",
      });
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
    } else {
      setShowMessageBox(true);
      setMessageInfo({
        status: "error",
        title: "Password Error",
        message: "Current Password is incorrect",
      });
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
    }
  };

  console.log(userData);

  return (
    <section className={`${PageSpacing} flex-col gap-5`}>
      <nav className="flex items-center justify-between">
        <button>Go back</button>
        <section className="w-fit h-fit rounded-md bg-white shadow-md p-1 flex flex-row gap-1">
          {["Personal Information", "Office Affiliation", "Password"].map(
            (key) => (
              <button
                key={key}
                className={`text-p-sm ${activeTab === key ? tabStyle : "px-2"}`}
                onClick={() => setActiveTab(key)}
              >
                {key}
              </button>
            )
          )}
        </section>
      </nav>
      <div className="w-full h-full flex flex-row gap-5">
        <div className="w-1/4 flex flex-col flex-1">
          <article className="w-full h-fit rounded-md flex flex-col gap-1 items-center p-5 bg-white shadow-md">
            <img
              src=""
              alt="Profile Image"
              className="w-40 h-40 rounded-full bg-red-100"
            />
            <p className="text-p-rg font-medium">{`${userData.first_name} ${userData.last_name}`}</p>
            <p className="text-p-sm font-medium">{userData.email}</p>
            <section className="flex flex-row gap-10 mt-3">
              <p className="flex flex-col items-center text-p-lg">
                6
                <span className="text-p-sc font-medium text-c-grey-50">
                  Courses
                </span>
              </p>
              <div className="border-l border-c-grey-50 my-1"></div>
              <p className="flex flex-col items-center text-p-lg">
                3
                <span className="text-p-sc font-medium text-c-grey-50">
                  Completed
                </span>
              </p>
            </section>
          </article>
          <section className="flex flex-col items-start mt-5 gap-2">
            {["User Profile", "Courses"].map((key) => (
              <button
                key={key}
                className={`${
                  activeSection === key
                    ? sectionStyle
                    : "border-l-2 border-content-bg pl-2"
                }`}
                onClick={() => setActiveSection(key)}
              >
                {key}
              </button>
            ))}
          </section>
        </div>
        <div className="w-3/4 p-5 rounded-md bg-white shadow-md">
          {activeSection === "User Profile" ? (
            <section>
              {activeTab === "Personal Information" && (
                <div className="w-full flex-1 flex flex-col gap-5">
                  <section className="w-full h-fit gap-5 flex flex-row">
                    <p className="flex flex-col w-1/3">
                      Personal Information
                      <span className="text-p-sm text-c-grey-50">
                        Update your personal information
                      </span>
                    </p>
                    <div className="w-2/3 flex flex-col gap-3">
                      <div className="w-full flex flex-row gap-5">
                        <section className="w-full">
                          <p className="text-p-sm">First Name</p>
                          <input
                            type="text"
                            value={userData.first_name}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                first_name: e.target.value,
                              })
                            }
                            className={`${defaultInput} w-full ${
                              errors.first_name ? "border-red-500" : ""
                            }`}
                          />
                          {errors.first_name && (
                            <p className="text-red-500 text-xs">
                              {errors.first_name}
                            </p>
                          )}
                        </section>
                        <section className="w-full">
                          <p className="text-p-sm">Last Name</p>
                          <input
                            type="text"
                            value={userData.last_name}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                last_name: e.target.value,
                              })
                            }
                            className={`${defaultInput} w-full ${
                              errors.last_name ? "border-red-500" : ""
                            }`}
                          />
                          {errors.last_name && (
                            <p className="text-red-500 text-xs">
                              {errors.last_name}
                            </p>
                          )}
                        </section>
                      </div>
                      <section className="w-full">
                        <p className="text-p-sm">Official ID No.</p>
                        <input
                          type="number"
                          value={userData.official_id_number}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              official_id_number: e.target.value,
                            })
                          }
                          className={`${defaultInput} w-full ${
                            errors.official_id_number ? "border-red-500" : ""
                          }`}
                        />
                        {errors.official_id_number && (
                          <p className="text-red-500 text-xs">
                            {errors.official_id_number}
                          </p>
                        )}
                      </section>
                      <section className="w-full">
                        <p className="text-p-sm">Gender</p>
                        <select
                          value={userData.sex}
                          onChange={(e) =>
                            setUserData({ ...userData, sex: e.target.value })
                          }
                          className={errors.sex ? "border-red-500" : ""}
                        >
                          {sex.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.sex && (
                          <p className="text-red-500 text-xs">{errors.sex}</p>
                        )}
                      </section>
                      <div className="flex flex-col">
                        <label className="mb-1">Birthdate</label>
                        <div className="w-full flex gap-2">
                          <div className="w-1/5">
                            <input
                              type="number"
                              min="1"
                              max="31"
                              value={date.day}
                              onChange={(e) =>
                                setDate({ ...date, day: e.target.value })
                              }
                              //styling="tertiary"
                              className={
                                errors.birth_date
                                  ? "border-red-500"
                                  : `${defaultInput}`
                              }
                            />
                          </div>
                          <div className="w-2/5">
                            <select
                              value={date.month}
                              onChange={(e) =>
                                setDate({ ...date, month: e.target.value })
                              }
                              className={
                                errors.birth_date ? "border-red-500" : ""
                              }
                            >
                              {months.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="w-2/5">
                            <select
                              value={date.year}
                              onChange={(e) =>
                                setDate({ ...date, year: e.target.value })
                              }
                              className={
                                errors.birth_date ? "border-red-500" : ""
                              }
                            >
                              {years.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button type="button" className="w-fit px-2 relative">
                            <MdCalendarToday
                              className="text-f-gray"
                              size={24}
                            />
                          </button>
                        </div>
                        {errors.birth_date && (
                          <p className="text-red-500 text-xs">
                            {errors.birth_date}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                  <hr />
                  <section className="w-full h-fit gap-5 flex flex-row">
                    <p className="flex flex-col w-1/3">
                      Contact Information
                      <span className="text-p-sm text-c-grey-50">
                        Update your contact information
                      </span>
                    </p>
                    <div className="w-2/3 flex flex-col gap-3">
                      <section className="w-full">
                        <p className="text-p-sm">Municipality (Region IV-A)</p>
                        <div className="relative">
                          <input
                            type="text"
                            value={userData.address}
                            placeholder="Select Municipality"
                            //styling="tertiary"
                            onChange={(e) => {
                              setMunicipalitiesSearch(e.target.value);
                              setUserData({
                                ...userData,
                                address: e.target.value,
                              });
                            }}
                            className={
                              errors.address
                                ? "border-red-500"
                                : `${defaultInput}`
                            }
                          />
                          {errors.address && (
                            <p className="text-red-500 text-xs">
                              {errors.address}
                            </p>
                          )}
                          {municipalitiesSearch && (
                            <div className="w-full p-2 absolute left-0 bg-white">
                              <div className="flex flex-col">
                                {Municipalities.region4A
                                  .filter((municipality: Municipality) =>
                                    municipality.label
                                      .toLowerCase()
                                      .includes(
                                        municipalitiesSearch.toLowerCase()
                                      )
                                  )
                                  .map((municipality: Municipality) => (
                                    <button
                                      type="button"
                                      key={municipality.value}
                                      className="text-left"
                                      onClick={() => {
                                        setUserData({
                                          ...userData,
                                          address: municipality.value,
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
                      </section>
                      <section className="w-full flex flex-col">
                        <p className="text-p-sm">Contact Number</p>
                        <div className="flex gap-3">
                          <article className="bg-c-grey-5 rounded-md px-2 py-1 mt-1 flex gap-2 items-center w-fit">
                            <img src={Ph} alt="icon" className="w-8" />
                            <p className="text-p-sm">+63</p>
                          </article>
                          <input
                            type="number"
                            value={userData.contact}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                contact: e.target.value,
                              })
                            }
                            className={`${defaultInput} flex-1 ${
                              errors.contact ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.contact && (
                          <p className="text-red-500 text-xs">
                            {errors.contact}
                          </p>
                        )}
                      </section>
                      <section className="w-full">
                        <p className="text-p-sm">Email Address</p>
                        <input
                          type="email"
                          value={userData.email}
                          className={`${defaultInput} w-full ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs">{errors.email}</p>
                        )}
                      </section>
                    </div>
                  </section>
                  <footer className="w-full flex-1 flex justify-end mt-5">
                    <button
                      onClick={handleUpdatePersonalInformation}
                      className="bg-black text-f-light rounded-md px-3 py-2"
                    >
                      Update Information
                    </button>
                  </footer>
                </div>
              )}
              {activeTab === "Office Affiliation" && (
                <section className="w-full h-fit gap-5 flex flex-row">
                  <p className="flex flex-col w-1/3">
                    Work Information
                    <span className="text-p-sm text-c-grey-50">
                      Update your professional details
                    </span>
                  </p>
                  <div className="w-2/3 flex flex-col gap-3">
                    <section className="w-full">
                      <p className="text-p-sm">Affiliation</p>
                      <select
                        value={userData.affiliation}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            affiliation: e.target.value,
                          })
                        }
                        className={errors.affiliation ? "border-red-500" : ""}
                      >
                        {affiliation.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.affiliation && (
                        <p className="text-red-500 text-xs">
                          {errors.affiliation}
                        </p>
                      )}
                    </section>
                    <section className="w-full">
                      <p className="text-p-sm">Office Name</p>
                      <select
                        value={userData.office_name}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            office_name: e.target.value,
                          })
                        }
                        className={errors.office_name ? "border-red-500" : ""}
                      >
                        {officeName.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.office_name && (
                        <p className="text-red-500 text-xs">
                          {errors.office_name}
                        </p>
                      )}
                    </section>
                    <section className="w-full">
                      <p className="text-p-sm">Office Address</p>
                      <input
                        type="text"
                        value={userData.office_address}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            office_address: e.target.value,
                          })
                        }
                        className={`${defaultInput} w-full ${
                          errors.office_address ? "border-red-500" : ""
                        }`}
                      />
                      {errors.office_address && (
                        <p className="text-red-500 text-xs">
                          {errors.office_address}
                        </p>
                      )}
                    </section>
                    <section className="w-full">
                      <p className="text-p-sm">
                        Division / Department / Cluster / Section / Unit
                      </p>
                      <input
                        type="text"
                        value={userData.department}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            department: e.target.value,
                          })
                        }
                        className={`${defaultInput} w-full ${
                          errors.department ? "border-red-500" : ""
                        }`}
                      />
                      {errors.department && (
                        <p className="text-red-500 text-xs">
                          {errors.department}
                        </p>
                      )}
                    </section>
                    <section className="w-full">
                      <p className="text-p-sm">Designation</p>
                      <input
                        type="text"
                        value={userData.position_title}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            position_title: e.target.value,
                          })
                        }
                        className={`${defaultInput} w-full ${
                          errors.position_title ? "border-red-500" : ""
                        }`}
                      />
                      {errors.position_title && (
                        <p className="text-red-500 text-xs">
                          {errors.position_title}
                        </p>
                      )}
                    </section>
                    <footer className="w-full flex-1 flex justify-end mt-5">
                      <button
                        onClick={handleUpdateAffiliation}
                        className="bg-black text-f-light rounded-md px-3 py-2"
                      >
                        Update Affiliation
                      </button>
                    </footer>
                  </div>
                </section>
              )}
              {activeTab === "Password" && (
                <section className="w-full h-fit gap-5 flex flex-row">
                  <p className="flex flex-col w-1/3">
                    Work Information
                    <span className="text-p-sm text-c-grey-50">
                      Update your professional details
                    </span>
                  </p>
                  <div className="w-2/3 flex flex-col gap-3">
                    <section className="w-full">
                      <p className="text-p-sm">Current Password</p>
                      <input
                        type="password"
                        className={`${defaultInput} w-full`}
                        onBlur={(e) => {
                          if (
                            !passwordStatus.correct &&
                            passwordStatus.message === ""
                          ) {
                            checkCurrentPassword(e.target.value);
                          }
                        }}
                      />
                    </section>
                    {passwordStatus.correct &&
                      passwordStatus.message === "Password Match!" && (
                        <>
                          <section className="w-full">
                            <p className="text-p-sm">New Password</p>
                            <input
                              type="password"
                              className={`${defaultInput} w-full ${
                                errors.password ? "border-red-500" : ""
                              }`}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  password: e.target.value,
                                })
                              }
                            />
                            {errors.password && (
                              <p className="text-red-500 text-xs">
                                {errors.password}
                              </p>
                            )}
                          </section>
                          <section className="w-full">
                            <p className="text-p-sm">Confirm Password</p>
                            <input
                              type="password"
                              className={`${defaultInput} w-full ${
                                errors.confirmPassword ? "border-red-500" : ""
                              }`}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                            {errors.confirmPassword && (
                              <p className="text-red-500 text-xs">
                                {errors.confirmPassword}
                              </p>
                            )}
                          </section>
                        </>
                      )}
                    <footer className="w-full flex-1 flex justify-end mt-5">
                      <button
                        onClick={handleUpdatePassword}
                        disabled={
                          !passwordStatus.correct &&
                          passwordStatus.message !== "Password Match!"
                        }
                        className={`${
                          !passwordStatus.correct &&
                          passwordStatus.message !== "Password Match!"
                            ? "bg-gray-100 text-gray-400"
                            : "bg-black text-f-light"
                        } rounded-md px-3 py-2`}
                      >
                        Update Password
                      </button>
                    </footer>
                  </div>
                </section>
              )}
            </section>
          ) : (
            <section>b</section>
          )}
        </div>
      </div>
      {showMessageBox && (
        <MessageBox
          status={messageInfo.status}
          title={messageInfo.title}
          message={messageInfo.message}
        />
      )}
    </section>
  );
};

export default ViewUserProfile;
