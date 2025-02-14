import { useState } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { setUser } from '../redux/UserRedux'

import api from '../instance/instanceAPI'
import { useNavigate } from 'react-router-dom'

interface LoginCredentials {
  email: string;
  password: string;
}

const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL: string = import.meta.env.VITE_URL
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async(data: LoginCredentials) => {
    console.log('gegeggegege')
    setError(null)
    setIsLoading(true)
    try {
      console.log('gegeggegege222')
      const response = await axios.post(`${API_URL}/accounts/login/`, JSON.stringify(data), {
        headers: { 
          'Content-Type': 'application/json'
        }
      })
      console.log('gegeggegege333')
      if(response.status === 200){
        setIsLoading(false)
        console.log(response.data)
        dispatch(setUser(response.data))
        role(response.data.user.role)
      }  
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message);
        setError(error.response?.data?.message || "Something went wrong");
      } else {
        console.log(error);
        setError("An unexpected error occurred");
      }
    }
  }

  const role = (roleName: string) => {  
    if(!roleName) navigate('/login')
    if(roleName === 'trainee') navigate('/learner/home')
  }

  const handleLogout = async() => {
    setError(null)
    setIsLoading(true)
    try {
        const response = await axios.post(`${API_URL}/accounts/logout/`, {},{
            withCredentials: true
          });
          console.log(response.status)
        if(response.status === 200){
          setIsLoading(false)
          dispatch(setUser(null))
          role('')
        }  
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data?.message);
            setError(error.response?.data?.message || "Something went wrong");
        } else {
            console.log(error);
            setError("An unexpected error occurred");
        }
    }
  }

  return  {handleLogin, handleLogout, isLoading, error}
}

export default useAuthHook
