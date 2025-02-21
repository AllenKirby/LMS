import { useState } from "react"
import axios from "axios"

interface OverviewData {
    cover_image_upload: string,
    course_title: string;
    course_description: string;
    department: 'IT' | 'EOD' | 'AFD' | 'RIM' | 'EMU' | '';
    visibility: 'public' | 'private' | '';
  }

const useTrainingOfficer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const API_URL: string = import.meta.env.VITE_URL
    
    const handleAddCourse = async(data: OverviewData) => {
        setIsLoading(true)
        setError(null)
        try {
           const res = await axios.post(`${API_URL}/course/courses/`, data) 
           if(res){
                setIsLoading(false)
                console.log(res.data)
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
  return { handleAddCourse, isLoading, error }
}

export default useTrainingOfficer