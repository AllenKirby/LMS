import { useState } from 'react'
import axios from 'axios'
//import { useDispatch } from 'react-redux'
//import { setMenus } from '../redux/CourseContentDataRedux'

const useTraineeHook = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const API_URL: string = import.meta.env.VITE_URL
    //const dispatch = useDispatch()

    const getTraineeCourses = async(id: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/user/${id}/`)
            if(response.status === 200) {
              const data = response.data
              return data
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

    const getCourse = async(id: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/courses/${id}/section-details/`)
            if(response.status === 200) {
              const data = response.data
              return data
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

    const getCourseContent = async(id: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/courses/${id}/section-details/`, {
                withCredentials: true
            })
            if(response.status === 200){
                const data = response.data
                return data
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

    const getSingleModule = async(id: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/modules/${id}/`, {
                withCredentials: true
            })
            if(response.status === 200){
                const data = response.data
                return data
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

  return {getTraineeCourses, getCourse, getCourseContent, getSingleModule, isLoading, error}
}

export default useTraineeHook
