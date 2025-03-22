import { useState } from 'react'
import axios from 'axios'
//import { useDispatch } from 'react-redux'

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

  return {getTraineeCourses, isLoading, error}
}

export default useTraineeHook
