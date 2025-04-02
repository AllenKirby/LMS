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

    const getSingleModule = async(userID: number, moduleID: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/module/${userID}/${moduleID}/`, {
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

    const submitAnswers = async(moduleID: number, userID: number, data: { answers: {[key: string]: string | string[]} }) => {
        setIsLoading(true)
        setError(null)
        console.log(data)
        try {
            const response = await axios.post(`${API_URL}/course/user_participant/${moduleID}/${userID}/`, data,{
                withCredentials: true
            })
            if(response.status === 200){
                setIsLoading(false)
                console.log(response.data)
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

    const updateCourseStatus = async(courseID: number, userID: number, data: { participant_status: string }) => {
        setIsLoading(true)
        setError(null)
        console.log(courseID)
        try {
            const response = await axios.patch(`${API_URL}/course/course-progress/${courseID}/${userID}/`, data,{
                withCredentials: true
            })
            if(response.status === 200){
                setIsLoading(false)
                console.log(response.data)
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

    const updateModuleStatus = async(data: { participant_module_progress: string, module: number, participant: number }) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_URL}/course/module-update-progress/`, data,{
                withCredentials: true
            })
            if(response.status === 200){
                setIsLoading(false)
                console.log(response.data)
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

    const getUserResources = async(userID: number, courseID: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/user/${userID}/documents/${courseID}/`, {
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

  return {
    getTraineeCourses, 
    getCourse, 
    getCourseContent, 
    getSingleModule, 
    submitAnswers, 
    updateCourseStatus, 
    getUserResources, 
    updateModuleStatus,
    isLoading, 
    error}
}

export default useTraineeHook
