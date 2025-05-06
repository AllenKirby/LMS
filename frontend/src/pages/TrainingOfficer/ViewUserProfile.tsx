import { PageSpacing } from "../../assets/Util/Spacing";
import { DPButton } from "../../assets/Util/ButtonStyle";
import { defaultInput } from "../../assets/Util/InputStyle";
import Ph from "../../assets/Ph.jpg";

import { useEffect, useState } from "react";
import { useTraineeHook } from "../../hooks";
import { useSelector } from "react-redux";
import { UserState, SignupState } from "../../types/UserTypes";
import Municipalities from "../../assets/json/Municipalites.json";

import { Input, Select } from "../../Components/UIComponents";

interface Municipality {
  label: string;
  value: string;
}

const ViewUserProfile = () => {
  const [activeTab, setActiveTab] = useState<string>("Personal Information");
  const [activeSection, setActiveSection] = useState<string>("User Profile");
  const [municipalitiesSearch, setMunicipalitiesSearch] = useState<string>("");
  const { tab: tabStyle, section: sectionStyle } = DPButton;
  const { getUserInfo, validatePassword, updateUserData } = useTraineeHook()
  const user = useSelector((state: {user: UserState}) => state.user)
  const [passwordStatus, setPasswordStatus] = useState<{message: string, correct: boolean}>({
    message: "",
    correct: false
  })
  const [userData, setUserData] = useState<>({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    sex: '',
    birth_date: '',
    official_id_number: '',
    contactNumber: '',
    municipality: '',
    affiliation: '',
    officeName: '',
    officeAddress: '',
    department: '',
    positionTitle: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const getUserData= async() => {
      const response = await getUserInfo(user.user.id)
      if(response) {
        setUserData(response)
        console.log(response)
      }
    }
    getUserData()
  }, [])

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
    if(userData.confirmPassword === userData.password && passwordStatus.correct && passwordStatus.message === "Password Match!") {
      console.log('goods')
      const data = {
        password: userData.password
      }
      await updateUserData(data, user.user.id)
    }
  }

  const handleUpdatePersonalInformation = async() => {
    const data = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      birth_date: userData.birth_date,
      sex: userData.password,
      contact: userData.contactNumber,
      email: userData.email
    }
    await updateUserData(data, user.user.id)
  }
  
  const handleUpdateAffiliation = async() => {
    const data = {
      affiliation: userData.affiliation,
      office_name: userData.officeName,
      office_address: userData.officeAddress,
      department: userData.department,
      position_title: userData.positionTitle,
    }
    await updateUserData(data, user.user.id)
  }

  const checkCurrentPassword = async(currentPassword: string) => {
    const res = await validatePassword({email: userData.email, password: currentPassword})
    console.log(res)
    if(res) {
      setPasswordStatus(res)
    }
  }
  
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
                            <p className="text-p-sm">Gender</p>
                            <Select
                              value={userData.officeName}
                              onChange={(e) => setUserData({...userData, sex: e.target.value})}
                              options={sex}
                            />
                        </section>
                        <section className="w-full">
                            <p className="text-p-sm">Date of Birth</p>
                            <input type="date" className={`${defaultInput} w-full`}/>
                        </section>
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
                              value={municipalitiesSearch}
                              placeholder="Select Municipality"
                              styling="tertiary"
                              onChange={(e) => {setMunicipalitiesSearch(e.target.value); setUserData({...userData, municipality: municipalitiesSearch})}}
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
                                        // onClick={() => {
                                        //   setSignupCredentials({
                                        //     ...signupCredentials,
                                        //     municipality: municipality.value,
                                        //   });
                                        //   setMunicipalitiesSearch("");
                                        // }}
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
                            <input type="number" className={`${defaultInput} flex-1`}/>
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
                            value={userData.officeName}
                            onChange={(e) => setUserData({...userData, officeName: e.target.value})}
                            options={officeName}
                          />
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Office Address</p>
                          <input type="text" value={userData.officeAddress} onChange={(e) => setUserData({...userData, officeAddress: e.target.value})} className={`${defaultInput}  w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Division / Department / Cluster / Section / Unit</p>
                          <input type="text" value={userData.department} onChange={(e) => setUserData({...userData, department: e.target.value})} className={`${defaultInput} w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Designation</p>
                          <input type="text" value={userData.positionTitle} onChange={(e) => setUserData({...userData, positionTitle: e.target.value})} className={`${defaultInput} w-full`}/>
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
                          <input type="password" className={`${defaultInput} w-full`} onBlur={(e) => checkCurrentPassword(e.target.value)}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">New Password</p>
                          <input type="password" className={`${defaultInput} w-full`} onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Confirm Password</p>
                          <input type="password" className={`${defaultInput} w-full`} onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}/>
                      </section>
                      <footer className="w-full flex-1 flex justify-end mt-5">
                        <button onClick={handleUpdatePassword} className="bg-black text-f-light rounded-md px-3 py-2">Update Password</button>
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
    </section>
  )
}

export default ViewUserProfile
