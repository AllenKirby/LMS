import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdCheckboxOutline, IoIosAt } from "react-icons/io";
import { GoLock } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight,  MdOutlineKeyboardArrowLeft, MdCalendarToday } from "react-icons/md";

import Municipalities from '../../assets/json/Municipalites.json'

import { Input, Select } from '../../Components/UIComponents'
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
  division: string
  positionTitle: string
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
  const navigate = useNavigate()
  const [date, setDate] = useState({ day: '', month: '', year: ''})
  const [municipalitiesSearch, setMunicipalitiesSearch] = useState<string>('')
  const [showPassword, setShowPassword] = useState<ShowPassword>({password: false, confirmPassword: false})
  const [counter, setCounter] = useState<number>(1)
  const { handleSignup, isLoading } = useAuthHook()
  const [signupCredentials, setSignupCredentials] = useState<Signup>({
    email: '', 
    password: '', 
    confirmPassword: '', 
    firstname: '',
    lastname: '',
    sex: '',
    contactNumber: '',
    municipality: '',
    affiliation: '',
    officeName: '',
    officeAddress: '',
    division: '',
    positionTitle: ''
  })

  const months = [
    {label: 'January', value: '01'},
    {label: 'February', value: '02'},
    {label: 'March', value: '03'},
    {label: 'April', value: '04'},
    {label: 'May', value: '05'},
    {label: 'June', value: '06'},
    {label: 'July', value: '07'},
    {label: 'August', value: '08'},
    {label: 'September', value: '09'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'}
  ]

  const sex = [
    { label: "Select Sex", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ]

  const affiliation = [
    { label: "Select Affiliation", value: "" },
    { label: "Employed - Government - Regular", value: "Employed - Government - Regular" },
    { label: "Employed - Government - Contractual(CSC)", value: "Employed - Government - Contractual(CSC)" },
    { label: "Private Freelancer", value: "Private Freelancer" }
  ]

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => {
    const year = currentYear - index;
    return { label: year.toString(), value: year.toString() };
  });

  const increment = () => {
    setCounter(prevCounter => prevCounter + 1);
  }

  const decrement = () => {
    setCounter(prevCounter => prevCounter - 1)
  }

  const signup = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
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
      position_title: signupCredentials.positionTitle
    }
    await handleSignup(data)
  }

  return (
    <form onSubmit={signup} className="w-full h-full p-8 flex flex-col gap-5">
      <div className="w-full h-auto flex flex-col gap-3">
        <h1 className="text-h-h6 font-medium">Acount Registration</h1>
        <div className="flex items-start justify-start">
          <div className="flex flex-col items-start">
            <IoMdCheckboxOutline className="text-blue-500" size={20}/>
            <h6 className="text-xs text-left text-blue-500">Login <br/> Credentials</h6>
          </div>
          <div className={`${counter >= 2 ? 'border-blue-500' : 'border-f-gray'} w-20 border mt-3`}></div>
          <div className="flex flex-col items-start">
            <IoMdCheckboxOutline className={`${counter >= 2 ? 'text-blue-500' : 'text-f-gray'}`} size={20}/>
            <h6 className={`${counter >= 2 ? 'text-blue-500' : 'text-f-gray'} text-xs text-left`}>Personal <br/> Information</h6>
          </div>
          <div className={`${counter >= 3 ? 'border-blue-500' : 'border-f-gray'} w-20 border mt-3`}></div>
          <div className="flex flex-col items-start">
            <IoMdCheckboxOutline className={`${counter >= 3 ? 'text-blue-500' : 'text-f-gray'}`} size={20}/>
            <h6 className={`${counter >= 3 ? 'text-blue-500' : 'text-f-gray'} text-xs text-left`}>Affiliation</h6>
          </div>
        </div>
      </div>
      {counter === 1 && (
        <div className="w-full h-fit p-3">
          <div className="flex flex-col">
            <label className="font-medium">Email</label>
            <div className='relative w-auto h-auto'>
                <IoIosAt className='absolute left-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={28}/>
                <Input 
                  type="email" 
                  styling="secondary"
                  value={signupCredentials.email}
                  onChange={(e) => setSignupCredentials({...signupCredentials , email: e.target.value})}
                  placeholder='Enter valid email address'/>
            </div>
          </div>
          <div className="pt-5 flex flex-col">
            <label className="font-medium">Password</label>
            <div className='relative w-auto h-auto'>
              <GoLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/>
              <Input 
                type={showPassword.password ? "text" : "password"} 
                styling="primary"
                value={signupCredentials.password}
                onChange={(e) => setSignupCredentials({...signupCredentials, password: e.target.value})} 
                placeholder='Enter your password'/>
              <button 
                type='button' 
                onClick={() => setShowPassword({...showPassword, password: !showPassword.password})}>
                  {showPassword.password ? <FiEyeOff className='absolute right-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/> : <FiEye className='absolute right-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/>}
              </button>
            </div>
          </div>
          <div className="pt-5 flex flex-col">
            <label className="font-medium">Confirm Password</label>
            <div className='relative w-auto h-auto'>
              <GoLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/>
              <Input 
                type={showPassword.confirmPassword ? "text" : "password"} 
                styling="primary"
                value={signupCredentials.confirmPassword}
                onChange={(e) => setSignupCredentials({...signupCredentials, confirmPassword: e.target.value})} 
                placeholder='Confirm your password'/>
              <button 
                type='button' 
                onClick={() => setShowPassword({...showPassword, confirmPassword: !showPassword.confirmPassword})}>
                  {showPassword.confirmPassword ? <FiEyeOff className='absolute right-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/> : <FiEye className='absolute right-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/>}
              </button>
            </div>
          </div>
          <div className="w-full flex gap-3 mt-5">
            <div className="w-1/2 flex flex-col">
              <label className="font-medium">Firstname</label>
              <Input 
                type="text" 
                styling="tertiary" 
                value={signupCredentials.firstname}
                placeholder="Enter your firstname" 
                onChange={(e) => setSignupCredentials({...signupCredentials, firstname: e.target.value})}/>
            </div>
            <div className="w-1/2 flex flex-col">
              <label className="font-medium">Lastname</label>
              <Input 
                type="text" 
                styling="tertiary" 
                value={signupCredentials.lastname}
                placeholder="Enter you lastname" 
                onChange={(e) => setSignupCredentials({...signupCredentials, lastname: e.target.value})}/>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-end">
            <button 
              type="button" 
              onClick={increment}
              className="px-5 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2"
              >
                Continue <MdOutlineKeyboardArrowRight size={20}/>
            </button>
          </div>
        </div>
      )}
      {counter === 2 && (
        <div className="w-full h-fit p-3 ">
          <div className="flex flex-col">
            <label className="font-medium">Sex</label>
            <Select 
              value={signupCredentials.sex} 
              onChange={(e) => setSignupCredentials({...signupCredentials, sex: e.target.value})}
              options={sex}/>
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-medium">BirthDate</label>
            <div className="w-full flex gap-2">
              <div className="w-1/5">
                <Input type="number" min="1" max="31" placeholder={date.day}  onChange={(e) => setDate({...date, day: e.target.value})} styling="tertiary"/>
              </div>
              <div className="w-2/5">
                <Select value={date.month} onChange={(e) => setDate({...date, month: e.target.value})} options={months}/>
              </div>
              <div className="w-2/5">
                <Select value={date.year} onChange={(e) => setDate({...date, year: e.target.value})} options={years}/>
              </div>
              <button type="button" className="w-fit px-2 relative">
                <MdCalendarToday className="text-f-gray" size={24}/>
              </button>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-medium">Contact Number</label>
            <div className="flex flex-row gap-2">
              <div className='w-fit flex items-center justify-center gap-2 bg-gray-100 p-2'>
                <p className="text-f-gray">+63</p>
              </div>
              <div className="w-full">
                <Input 
                  type="number" 
                  placeholder="9123456789" 
                  styling="tertiary" 
                  value={signupCredentials.contactNumber}
                  onChange={(e) => setSignupCredentials({...signupCredentials, contactNumber: e.target.value})}/>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-medium">Municipality (Region-4A)</label>
            <div className="relative">
              <Input 
                type="text" 
                value={signupCredentials.municipality}
                placeholder="Select Municipality" 
                styling="tertiary"
                onChange={(e) => {
                  setMunicipalitiesSearch(e.target.value); 
                  setSignupCredentials({...signupCredentials, municipality: e.target.value})
                  }}/>
              {municipalitiesSearch && (
                <div className="w-full p-2 absolute left-0 bg-white">
                  <div className="flex flex-col">
                    {Municipalities.region4A.filter((municipality: Municipality) =>
                      municipality.label.toLowerCase().includes(municipalitiesSearch.toLowerCase())
                    ).map((municipality: Municipality) => (
                      <button 
                        type="button"
                        key={municipality.value} 
                        className="text-left"
                        onClick={() => {
                            setSignupCredentials({...signupCredentials, municipality: municipality.value}); 
                            setMunicipalitiesSearch('')
                          }
                        }
                      >
                        {municipality.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full mt-5 flex items-center justify-between">
              <button  
              onClick={decrement}
                type="button" 
                className="px-2 py-2 flex items-center justify-center gap-2 font-medium"
                >
                  <MdOutlineKeyboardArrowLeft size={20}/>Back
              </button>
              <button 
                type="button" 
                onClick={increment}
                className="px-5 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2"
                >
                  Continue <MdOutlineKeyboardArrowRight size={20}/>
              </button>
          </div>
        </div>
      )}
      {counter === 3 && (
        <div className="w-full h-fit p-3">
          <div className="flex flex-col">
            <label className="font-medium">Affiliation</label>
            <Select 
              value={signupCredentials.sex} 
              onChange={(e) => setSignupCredentials({...signupCredentials, affiliation: e.target.value})}
              options={affiliation}/>
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Office Name</label>
            <Input 
              type="text" 
              styling="tertiary" 
              placeholder="" 
              onChange={(e) => setSignupCredentials({...signupCredentials, officeName: e.target.value})}/>
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-medium">Office Address</label>
            <Input 
              type="text" 
              styling="tertiary" 
              placeholder="" 
              onChange={(e) => setSignupCredentials({...signupCredentials, officeAddress: e.target.value})}/>
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-medium">Division / Department / Cluster / Section / Unit</label>
            <Input 
              type="text" 
              styling="tertiary" 
              placeholder="" 
              onChange={(e) => setSignupCredentials({...signupCredentials, division: e.target.value})}/>
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-medium">Official Position Title(Appointment / Contract)</label>
            <Input 
              type="text" 
              styling="tertiary" 
              placeholder="" 
              onChange={(e) => setSignupCredentials({...signupCredentials, positionTitle: e.target.value})}/>
          </div>
          <div className="w-full mt-5 flex items-center justify-between">
            <button  
              onClick={decrement}
                type="button" 
                className="px-2 py-2 flex items-center justify-center gap-2 font-medium"
                >
                <MdOutlineKeyboardArrowLeft size={20}/>Back
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-5 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center gap-2"
              >
                Signup
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center py-3">
        <p className='text-f-gray'>Already have an account? {" "}
        <span 
            className='cursor-pointer text-f-green font-medium' 
            onClick={() => navigate('/login')}
            >
            Login
        </span>
        </p>
    </div>
    </form>
  )
}

export default SignupPage