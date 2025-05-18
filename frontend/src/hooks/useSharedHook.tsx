import axios from 'axios'
import {useState} from 'react'

type ProfileState = 
    {password: string} | 
    { 
        first_name: string;
        last_name: string;
        official_id_number: string;
        birth_date: string;
        sex: string;
        address: string;
        contact: string;
        email: string;
    } | 
    {
        affiliation: string;
        office_name: string;
        office_address: string;
        department: string;
        designation: string;
    }

const useSharedHook = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const API_URL = import.meta.env.VITE_URL

    const getProfilePicture = async() => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.get<Blob>(`${API_URL}/accounts/profile/`, {
                responseType: 'blob',
                withCredentials: true
            })
            if(response.status === 200){
                const imageBlob = response.data
                console.log(imageBlob)
                return URL.createObjectURL(imageBlob)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false)
                console.log(error.response?.data?.message);
                setError(error.response?.data?.message || "Something went wrong");
            } else {
                console.log(error);
                setError("An unexpected error occurred");
            }
        }
    }

    const updateProfilePicture = async(data: FormData) => {
        setIsLoading(true)
        setError(null)
        console.log(data)
        try {
            const response = await axios.patch(`${API_URL}/accounts/profile/`, data, {
                responseType: 'blob', 
                withCredentials: true
            })
            if(response.status === 200){
                setIsLoading(false)
                return true
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false)
                console.log(error.response?.data?.message);
                setError(error.response?.data?.message || "Something went wrong");
            } else {
                console.log(error);
                setError("An unexpected error occurred");
            }
        }
    }

    const updateUserData = async(data: ProfileState, userID: number) => {
        setIsLoading(true)
        setError(null)
        console.log(data)
        try {
            const response = await axios.patch(`${API_URL}/accounts/${userID}/`, data,{
                withCredentials: true
            })
            if(response.status === 200){
                setIsLoading(false)
                return true
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setIsLoading(false)
                console.log(error.response?.data?.message);
                setError(error.response?.data?.message || "Something went wrong");
            } else {
                console.log(error);
                setError("An unexpected error occurred");
            }
        }
    }

  return {getProfilePicture, updateUserData, updateProfilePicture, isLoading, error}
}

export default useSharedHook