import { useState } from "react"
import axios from "axios"

interface OverviewData {
    cover_image_upload: string,
    course_title: string;
    course_description: string;
    department: 'IT' | 'EOD' | 'AFD' | 'RIM' | 'EMU' | '';
    visibility: 'public' | 'private' | '';
  }

interface TrainingDataState {
    training_setup: string;
    training_title: string;
    start_date: string;
    end_date: string;
    resource_speakers: {host_name: string}[];
    venue: string;
    participants: (string | number)[];
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

    const retrieveTrainees = async() => {
        try {
            const response = await axios.get(`${API_URL}/accounts/trainees/`, {
                withCredentials: true
            })
            if(response.status === 200){
                return response.data
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

    const createExternalTraining = async(data: TrainingDataState) => {
        console.log(data)
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_URL}/training/training-course/`, data, {
                withCredentials: true 
            })
            if(response.status === 200) {
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

  return { handleAddCourse, retrieveTrainees, createExternalTraining,isLoading, error }
}

export default useTrainingOfficer