import {useNavigate} from 'react-router-dom'
//icons
import { GoLock } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from 'react';
import { IoIosAt } from "react-icons/io";

import { Input, Button } from '../../Components/UIComponents'
import { useAuthHook } from '../../hooks'

interface Login {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    //router
    const navigate = useNavigate()
    //hooks
    const { handleLogin, isLoading } = useAuthHook()
    //states
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loginCredentials, setLoginCredentials] = useState<Login>({email: '', password: ''})

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login attempt...");

        await handleLogin(loginCredentials);
    };

  return (
    <form onSubmit={login} className="w-auto h-auto px-8 py-12 bg-white">
        <section className="w-full h-auto py-3">
            <h1 className="text-h-h5 font-semibold">Get Started</h1>
            <p className='text-p-rg text-f-gray'>Ready to learn? Let's grow together and enhance our skills.</p>
        </section>
        <section className="w-full h-auto py-3">
            <label className="font-medium text-p-sm text-f-dark">Email Address</label>
            <div className='relative w-auto h-auto'>
                <IoIosAt className='absolute left-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={27}/>
                <Input 
                    type="email" 
                    styling='secondary'
                    onChange={(e) => setLoginCredentials({...loginCredentials, email: e.target.value})}
                    placeholder='Enter your email address'/>
            </div>
        </section>
        <section className="w-full h-auto py-3">
            <label className="font-medium text-p-sm text-f-dark">Password</label>
            <div className='relative w-auto h-auto'>
                <GoLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/>
                <Input 
                    type={showPassword ? "text" : "password"} 
                    styling='primary'
                    onChange={(e) => setLoginCredentials({...loginCredentials, password: e.target.value})} 
                    placeholder='Enter your password'/>
                <button type='button' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FiEyeOff className='absolute right-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/> : <FiEye className='absolute right-4 top-1/2 transform -translate-y-1/2 text-f-gray' size={24}/>}
                </button>
            </div>
            <div className='text-end'>
                <p className='cursor-pointer text-f-green font-medium'>Forgot Password?</p>
            </div>
        </section>
        <div className="w-full py-5 flex items-center justify-center">
            <Button type="submit" children='Login' disabled={isLoading}/>
        </div>
        <div className="flex flex-col items-center justify-center py-3">
            <p className='text-f-gray'>Don't have an account? {" "}
                <span 
                    className='cursor-pointer text-f-green font-medium' 
                    onClick={() => navigate('/signup')}
                    >
                        Signup
                </span>
            </p>
        </div>
    </form>
  )
}

export default LoginPage