import { useState } from 'react'
import axios from 'axios'

interface EvaluatedData {
  user: number;
  program_id: number;
  program_type: "course" | "training";
  program_evaluation: {
    improvement_list: string[];
    ratings: number | null;
    comments: string;
    others?: string;
  }
}

const useReviewerHook = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const API_URL: string = import.meta.env.VITE_URL

    const retrieveAllTrainings = async() => {
        try {
            const response = await axios.get(`${API_URL}/review/all_trainings/`)
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

    const retrieveCourseParticipants = async(courseID: number) => {
        try {
            const response = await axios.get(`${API_URL}/review/course/${courseID}/`)
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

    const retrieveAllCourses = async() => {
        try {
            const response = await axios.get(`${API_URL}/review/all_courses/`)
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

    const retrieveTraniningParticipants = async(trainingID: number) => {
        try {
            const response = await axios.get(`${API_URL}/review/training/${trainingID}/`)
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

    const submitEvaluatedData = async(data: EvaluatedData) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_URL}/review/evaluate/`, data, {
                withCredentials: true 
            })
            if(response.status === 201) {
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

    const retrieveUserEvaluation = async(endpoint: string) => {
        try {
            const response = await axios.get(endpoint)
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

  return {
    retrieveAllTrainings,
    retrieveAllCourses,
    retrieveCourseParticipants,
    submitEvaluatedData,
    retrieveTraniningParticipants,
    retrieveUserEvaluation,
    isLoading,
    error
  }
}

export default useReviewerHook