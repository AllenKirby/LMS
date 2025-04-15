import { PageSpacing } from "../../assets/Util/Spacing";
import { DPButton } from "../../assets/Util/ButtonStyle";
import { defaultInput } from "../../assets/Util/InputStyle";
import Ph from "../../assets/Ph.jpg";

import { useState } from "react";

const ViewUserProfile = () => {
  const [activeTab, setActiveTab] = useState<string>("Personal Information");
  const [activeSection, setActiveSection] = useState<string>("User Profile");
  const { tab: tabStyle, section: sectionStyle } = DPButton;
  
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
            <p className="text-p-rg font-medium">Dinielle Cordon</p>
            <p className="text-p-sm font-medium">dc@gmail.com</p>
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
                            <input type="text" className={`${defaultInput} w-full`}/>
                          </section>
                          <section className="w-full">
                            <p className="text-p-sm">First Name</p>
                            <input type="text" className={`${defaultInput} w-full`}/>
                          </section>
                        </div>
                        <section className="w-full">
                            <p className="text-p-sm">Gender</p>
                            <select name="gender" id="gender" className={`${defaultInput} w-full`}>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
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
                            <select name="municipality" id="municipality" className={`${defaultInput} w-full`}/>
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
                            <input type="email" className={`${defaultInput} w-full`}/>
                        </section>
                      </div>
                    </section>
                    <footer className="w-full flex-1 flex justify-end mt-5">
                      <button className="bg-black text-f-light rounded-md px-3 py-2">Update Information</button>
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
                        <select name="gender" id="gender" className={`${defaultInput} w-full`}>
                            <option value="---">---</option>
                            <option value="---">---</option>
                          </select>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Office Name</p>
                          <input type="text" className={`${defaultInput} w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Office Address</p>
                          <input type="text" className={`${defaultInput} w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Division / Department / Cluster / Section / Unit</p>
                          <input type="text" className={`${defaultInput} w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Official Position Title (Appointment/Contract)</p>
                          <input type="text" className={`${defaultInput} w-full`}/>
                      </section>
                      <footer className="w-full flex-1 flex justify-end mt-5">
                        <button className="bg-black text-f-light rounded-md px-3 py-2">Update Affiliation</button>
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
                          <input type="password" className={`${defaultInput} w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">New Password</p>
                          <input type="password" className={`${defaultInput} w-full`}/>
                      </section>
                      <section className="w-full">
                          <p className="text-p-sm">Confirm Password</p>
                          <input type="password" className={`${defaultInput} w-full`}/>
                      </section>
                      <footer className="w-full flex-1 flex justify-end mt-5">
                        <button className="bg-black text-f-light rounded-md px-3 py-2">Update Password</button>
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
