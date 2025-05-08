import { PageSpacing } from "../../assets/Util/Spacing";
import { DPButton } from "../../assets/Util/ButtonStyle";
import { defaultInput } from "../../assets/Util/InputStyle";
import Ph from "../../assets/Ph.jpg";
import {
  MdCalendarToday,
} from "react-icons/md";

import { useEffect, useState } from "react";
import { useTraineeHook } from "../../hooks";
import { useSelector } from "react-redux";
import { UserState } from "../../types/UserTypes";
import Municipalities from "../../assets/json/Municipalites.json";
import {MessageBox} from '../../Components'

import { Input, Select } from "../../Components/UIComponents";

interface Municipality {
  label: string;
  value: string;
}

const ViewUserProfile = () => {
  const [activeTab, setActiveTab] = useState<string>("Personal Information");
  const [activeSection, setActiveSection] = useState<string>("User Profile");
  const [municipalitiesSearch, setMunicipalitiesSearch] = useState<string>("");
  const [date, setDate] = useState({ day: "", month: "", year: "" });
  const { tab: tabStyle, section: sectionStyle } = DPButton;
  const { getUserInfo, validatePassword, updateUserData } = useTraineeHook()
  const user = useSelector((state: {user: UserState}) => state.user)
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<{status: 'success' | 'error' | 'warning' | 'info' | ''; title: string; message: string}>({
    status: "",
    title: "",
    message: ""
  });
  const [passwordStatus, setPasswordStatus] = useState<{message: string, correct: boolean}>({
    message: "",
    correct: false
  })
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
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    sex: '',
    official_id_number: '',
    contact: '',
    address: '',
    affiliation: '',
    office_name: '',
    office_address: '',
    department: '',
    position_title: '',
  })

  useEffect(() => {
    const getUserData= async() => {
      const response = await getUserInfo(user.user.id)
      if(response) {
        setUserData(response)
        console.log(response)
        const [year, month, day] = response.birth_date.split('-')
        console.log(year, month, day)
        setDate({
          year: year,
          month: month,
          day: day
        })
      }
    }
    getUserData()
  }, [])

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
    { label: "Employed - Government - Regular", value: "Employed - Government - Regular" },
    { label: "Employed - Government - Contractual (CSC)", value: "Employed - Government - Contractual (CSC)" },
    { label: "Employed - Government - Contract of Service / Job Order", value: "Employed - Government - Contract of Service / Job Order" },
    { label: "Employed - Government - Casual", value: "Employed - Government - Casual" },
    { label: "Employed - Government - Temporary", value: "Employed - Government - Temporary" },
    { label: "Employed - Government - Co-terminous", value: "Employed - Government - Co-terminous" },
    { label: "Seconded / Detailed from another agency", value: "Seconded / Detailed from another agency" },
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

  const handleUpdatePassword = async()=> {
    const passwordsFilled = !!userData.password && !!userData.confirmPassword;
    const passwordsMatch = userData.password === userData.confirmPassword;
    const passwordValid = passwordStatus.correct && passwordStatus.message === "Password Match!";

    if (passwordsFilled && passwordsMatch && passwordValid) {
      const data = {
        password: userData.password
      }
      const res = await updateUserData(data, user.user.id)
      if(res) {
        setShowMessageBox(true);
        setMessageInfo({
          status: "success",
          title: "Password Updated",
          message: "Your password has been successfully updated",
        })
        setTimeout(() => {
          setShowMessageBox(false);
        }, 2000);
      }
    }
  }

  const handleUpdatePersonalInformation = async() => {
    const data = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      official_id_number: userData.official_id_number,
      birth_date: `${date.year}-${date.month}-${date.day}`,
      sex: userData.password,
      municipality: userData.address,
      contact: userData.contact,
      email: userData.email
    }
    const res = await updateUserData(data, user.user.id)
    if(res) {
      setShowMessageBox(true);
      setMessageInfo({
        status: "success",
        title: "Profile Updated",
        message: "Your profile has been successfully updated",
      })
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
    }
  }
  
  const handleUpdateAffiliation = async() => {
    const data = {
      affiliation: userData.affiliation,
      office_name: userData.office_name,
      office_address: userData.office_address,
      department: userData.department,
      position_title: userData.position_title,
    }

    const isNotEmpty = Object.values(data).every(
      item => item !== null && item !== undefined && String(item).trim() !== ''
    );    
    if(isNotEmpty) {
      const res = await updateUserData(data, user.user.id)
      if(res) {
        setShowMessageBox(true);
        setMessageInfo({
          status: "success",
          title: "Profile Updated",
          message: "Your profile has been successfully updated",
        })
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
      })
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
    }
  }

  const checkCurrentPassword = async(currentPassword: string) => {
    const res = await validatePassword({email: userData.email, password: currentPassword})
    console.log(res)
    if(res.correct && res.message === "Password Match!") {
      setPasswordStatus(res)
      setShowMessageBox(true);
      setMessageInfo({
        status: "success",
        title: "Password Matched",
        message: "Current Password is correct",
      })
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
    } else {
      setShowMessageBox(true);
      setMessageInfo({
        status: "error",
        title: "Password Error",
        message: "Current Password is incorrect",
      })
      setTimeout(() => {
        setShowMessageBox(false);
      }, 2000);
    }
  }

  console.log(userData)
  
  return (
    <section className={`${PageSpacing} flex-col gap-5`}>
      <nav className="flex items-center justify-between">
        <button>Go back</button>
        <section className="w-fit h-fit rounded-md bg-white shadow-md p-1 flex flex-row gap-1">
          {["Personal Information", "Office Affiliation", "Password"].map((key) =>(
            <button 
              key={key}
              className={`text-p-sm ${activeTab === key ? tabStyle : "px-2"}`} 
              onClick={() => setActiveTab(key)}
            >{key}</button>
          ))}
        </section>
      </nav>
      <div className="w-full h-full flex flex-row gap-5">
        <div className="w-1/4 flex flex-col flex-1">
          <article className="w-full h-fit rounded-md flex flex-col gap-1 items-center p-5 bg-white shadow-md">
            <img src="" alt="Profile Image" className="w-40 h-40 rounded-full bg-red-100"/>
            <p className="text-p-rg font-medium">{`${userData.first_name} ${userData.last_name}`}</p>
            <p className="text-p-sm font-medium">{userData.email}</p>
            <section className="flex flex-row gap-10 mt-3">
              <p className="flex flex-col items-center text-p-lg">6
                <span className="text-p-sc font-medium text-c-grey-50">Courses</span>
              </p>
              <div className="border-l border-c-grey-50 my-1"></div>
              <p className="flex flex-col items-center text-p-lg">3
                <span className="text-p-sc font-medium text-c-grey-50">Completed</span>
              </p>
            </section>
          </article>
          <section className="flex flex-col items-start mt-5 gap-2">
            {["User Profile", "Courses"].map((key) => (
              <button 
                key={key} 
                className={`${activeSection === key ? sectionStyle : "border-l-2 border-content-bg pl-2"}`}
                onClick={() => setActiveSection(key)}
              >{key}</button>
            ))}
          </section>
        </div>
        <div className="w-3/4 p-5 rounded-md bg-white shadow-md">
            {activeSection === "User Profile" ? (
              <section>
                {activeTab === "Personal Information" && 
                  <div className="w-full flex-1 flex flex-col gap-5">
                    <section className="w-full h-fit gap-5 flex flex-row">
                      <p className="flex flex-col w-1/3">Personal Information 
                        <span className="text-p-sm text-c-grey-50">Update your personal information</span>
                      </p>
                      <div className="w-2/3 flex flex-col gap-3">
                        <div className="w-full flex flex-row gap-5">
                          <section className="w-full">
                            <p className="text-p-sm">First Name</p>
                            <input type="text" value={userData.first_name} onChange={(e) => setUserData({...userData, first_name: e.target.value})} className={`${defaultInput} w-full`}/>
                          </section>
                          <section className="w-full">
                            <p className="text-p-sm">Last Name</p>
                            <input type="text" value={userData.last_name} onChange={(e) => setUserData({...userData, last_name: e.target.value})} className={`${defaultInput} w-full`}/>
                          </section>
                        </div>
                        <section className="w-full">
                            <p className="text-p-sm">Official ID No.</p>
                            <input type="number" value={userData.official_id_number} onChange={(e) => setUserData({...userData, official_id_number: e.target.value})} className={`${defaultInput} w-full`}/>
                          </section>
                        <section className="w-full">
                            <p className="text-p-sm">Gender</p>
                            <Select
                              value={userData.sex}
                              onChange={(e) => setUserData({...userData, sex: e.target.value})}
                              options={sex}
                            />
                        </section>
                        <div className="flex flex-col">
                          <label className="mb-1">Birthdate</label>
                          <div className="w-full flex gap-2">
                            <div className="w-1/5">
                              <Input
                                type="number"
                                min="1"
                                max="31"
                                value={date.day}
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
                      </div>
                    </section>
                    <hr />
                    <section className="w-full h-fit gap-5 flex flex-row">
                      <p className="flex flex-col w-1/3">Contact Information
                        <span className="text-p-sm text-c-grey-50">Update your contact information</span>
                      </p>
                      <div className="w-2/3 flex flex-col gap-3">
                        <section className="w-full">
                            <p className="text-p-sm">Municipality (Region IV-A)</p>
                            <div className="relative">
                            <Input
                              type="text"
                              value={userData.address}
                              placeholder="Select Municipality"
                              styling="tertiary"
                              onChange={(e) => {setMunicipalitiesSearch(e.target.value); setUserData({...userData, address: e.target.value})}}
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
                              <img src={Ph} alt="icon" className="w-8"/>
                              <p className="text-p-sm">+63</p>
                            </article>
                            <input type="number" value={userData.contact} onChange={(e) => setUserData({...userData, contact: e.target.value})} className={`${defaultInput} flex-1`}/>
                          </div>
                        </section>
                        <section className="w-full">
                            <p className="text-p-sm">Email Address</p>
                            <input type="email" value={userData.email} className={`${defaultInput} w-full`}/>
                        </section>
                      </div>
                    </section>
                    <footer className="w-full flex-1 flex justify-end mt-5">
                      <button onClick={handleUpdatePersonalInformation} className="bg-black text-f-light rounded-md px-3 py-2">Update Information</button>
                    </footer>
                  </div>
                }
                {activeTab === "Office Affiliation" && 
                  <section className="w-full h-fit gap-5 flex flex-row">
                    <p className="flex flex-col w-1/3">Work Information
                      <span className="text-p-sm text-c-grey-50">Update your professional details</span>
                    </p>
                    <div className="w-2/3 flex flex-col gap-3">
                      <section className="w-full">
                        <p className="text-p-sm">Affiliation</p>
                        <Select
                          value={userData.affiliation}
                          onChange={(e) => setUserData({...userData, affiliation: e.target.value})}
                          options={affiliation}
                        />
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Office Name</p>
                          <Select
                            value={userData.office_name}
                            onChange={(e) => setUserData({...userData, office_name: e.target.value})}
                            options={officeName}
                          />
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Office Address</p>
                          <input type="text" value={userData.office_address} onChange={(e) => setUserData({...userData, office_address: e.target.value})} className={`${defaultInput}  w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Division / Department / Cluster / Section / Unit</p>
                          <input type="text" value={userData.department} onChange={(e) => setUserData({...userData, department: e.target.value})} className={`${defaultInput} w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Designation</p>
                          <input type="text" value={userData.position_title} onChange={(e) => setUserData({...userData, position_title: e.target.value})} className={`${defaultInput} w-full`}/>
                      </section>
                      <footer className="w-full flex-1 flex justify-end mt-5">
                        <button onClick={handleUpdateAffiliation} className="bg-black text-f-light rounded-md px-3 py-2">Update Affiliation</button>
                      </footer>
                    </div>
                </section>
                }
                {activeTab === "Password" && 
                  <section className="w-full h-fit gap-5 flex flex-row">
                    <p className="flex flex-col w-1/3">Work Information
                      <span className="text-p-sm text-c-grey-50">Update your professional details</span>
                    </p>
                    <div className="w-2/3 flex flex-col gap-3">
                      <section className="w-full">
                          <p className="text-p-sm">Current Password</p>
                          <input type="password" className={`${defaultInput} w-full`} onBlur={(e) => {
                            if (!passwordStatus.correct && passwordStatus.message === "") {
                              checkCurrentPassword(e.target.value);
                            }
                          }}/>
                      </section>
                      {(passwordStatus.correct && passwordStatus.message === "Password Match!") && (
                        <>
                          <section className="w-full">
                            <p className="text-p-sm">New Password</p>
                            <input type="password" className={`${defaultInput} w-full`} onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                          </section>
                          <section className="w-full">
                              <p className="text-p-sm">Confirm Password</p>
                              <input type="password" className={`${defaultInput} w-full`} onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}/>
                          </section>
                        </>
                      )}
                      <footer className="w-full flex-1 flex justify-end mt-5">
                        <button onClick={handleUpdatePassword} disabled={!passwordStatus.correct && passwordStatus.message !== "Password Match!"} className={`${!passwordStatus.correct && passwordStatus.message !== "Password Match!" ? 'bg-gray-100 text-gray-400' : 'bg-black text-f-light' } rounded-md px-3 py-2`}>Update Password</button>
                      </footer>
                    </div>
                  </section>
                }
              </section>
            ) : (
              <section>b</section>
            )}
        </div>
      </div>
      {showMessageBox && (<MessageBox status={messageInfo.status} title={messageInfo.title} message={messageInfo.message}/>)}
    </section>
  )
}

export default ViewUserProfile
