import { useState } from "react"
import axios from "axios"

import { useDispatch } from "react-redux";
import { setMenus, setMenu, removeMenu } from "../redux/CourseContentDataRedux";
import { setID } from '../redux/CourseIDRedux'
import { updateField, setCourseData } from "../redux/CourseDataRedux";

import { replaceModule, setSubmitted, deleteModulePermanent } from "../redux/ModuleDataRedux";
import { ModuleState, CourseData, TrainingDataState, FileUploadState } from '../types/CourseCreationTypes'

const useTrainingOfficer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const API_URL: string = import.meta.env.VITE_URL
    const dispatch = useDispatch()
    
    const handleAddCourse = async(data: CourseData) => {
        setIsLoading(true)
        setError(null)
        
        const formData = new FormData();
        if (data.cover_image_upload) {
            formData.append("cover_image_upload", data.cover_image_upload);
        }
        formData.append("course_title", data.course_title);
        formData.append("course_description", data.course_description);
        formData.append("department", data.department);
        formData.append("visibility", data.visibility);
        formData.append("submitted", data.submitted.toString());

        data.participants.forEach((participant, index) => {
            formData.append(`participants[${index}]`, participant);
        });

        try {
           const res = await axios.post(`${API_URL}/course/courses/`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
           }) 
           if(res.status === 201){
                setIsLoading(false)
                const data = res.data
                dispatch(setID(data.id))
                dispatch(setCourseData(res.data))
                await getMenus(data.id)
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

    const deleteCourse = async(id: number) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.delete(`${API_URL}/course/courses/${id}/`, {
                withCredentials: true
            })
            if(response.status === 204){
                setIsLoading(false)
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

    const getMenus = async(id: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/courses/${id}/section-details/`, {
                withCredentials: true
            })
            if(response.status === 200){
                dispatch(setMenus(response.data))
                dispatch(updateField({name: 'submitted', value: true}))
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

    const SetMenuTitle = async(menuID: number, title: {title: string}) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.put(`${API_URL}/course/section/${menuID}/`, title, {
                withCredentials: true
            })
            if(response.status === 200){
                setIsLoading(false)
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

    const deleteMenu = async(id: number) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.delete(`${API_URL}/course/section/${id}/`, {
                withCredentials: true
            })
            if(response.status === 204){
                setIsLoading(false)
                dispatch(removeMenu(id))
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

    const handleUpdateCourse = async(id: number, data: CourseData) => {
        setIsLoading(true)
        setError(null)
        try {
           const res = await axios.put(`${API_URL}/course/courses/${id}/`, data) 
           if(res.status === 200){
                setIsLoading(false)
                const data = res.data
                dispatch(setID(data.id))
                dispatch(setCourseData(res.data))
                await getMenus(data.id)
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

    const handleAddMenu = async(id: number) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await axios.post(`${API_URL}/course/courses/${id}/section-details/`, {title: 'Untitled'}) 
            if(res.status === 201){
                setIsLoading(false)
                const data = res.data
                dispatch(setMenu(data))
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

    const handleAddModule = async(id: number, data: ModuleState) => {
        setIsLoading(true)
        setError(null)

        const newData = {
            ...data,
            content: data.content.filter(item => item.type !== 'uploadedFile'),
            submitted: true
        };
    
        const withFile = data.content.filter(item => (item as FileUploadState).type === 'uploadedFile')
        console.log(withFile)

        try {
            const res = await axios.post(`${API_URL}/course/sections/${id}/module/`, newData) 
            if(res.status === 201){
                setIsLoading(false)
                const response = res.data
                if(withFile.length > 0) {
                    await uploadCourseFile(response.id, withFile)
                    dispatch(setSubmitted({moduleID: response.moduleID, value: true}))
                } else {
                    dispatch(replaceModule({moduleID: response.moduleID, newModule: response}))
                    dispatch(setSubmitted({moduleID: response.moduleID, value: true}))
                }
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

    const uploadCourseFile = async(id: number, data: FileUploadState[]) => {
        setIsLoading(true)
        setError(null)
        console.log(data)

        const formData = new FormData();
        if(data) {
            data.forEach((doc) => {
                if(doc.file){
                    formData.append(`document_name`, doc.fileName);
                    formData.append(`document`, doc.file);
                    formData.append(`fileID`, doc.fileID);
                    formData.append(`type`, doc.type);
                }
            });
        }
        
        try {
           const res = await axios.post(`${API_URL}/course/documents/${id}/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
           }) 
           if(res.status === 201){
                setIsLoading(false)
                const response = res.data
                dispatch(replaceModule({moduleID: response.moduleID, newModule: response}))
                dispatch(setSubmitted({moduleID: response.moduleID, value: true}))
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

    const handleUpdateModule = async(id: number, data: ModuleState) => {
        console.log(id, data)
        setIsLoading(true)
        setError(null)

        const withFile = data.content.filter(item => (item as FileUploadState).type === 'uploadedFile')
        try {
            const res = await axios.put(`${API_URL}/course/modules/${id}/`, data) 
            if(res.status === 200){
                setIsLoading(false)
                const data = res.data
                console.log(data)
                if(withFile.length > 0) {
                    await uploadCourseFile(data.id, withFile)
                } else {
                    dispatch(replaceModule({moduleID: data.moduleID, newModule: data}))
                }
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

    const handleDeleteModule = async(id: number, courseID: number) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await axios.delete(`${API_URL}/course/modules/${id}/`, {
                withCredentials: true
            }) 
            if(res.status === 204){
                setIsLoading(false)
                console.log(res.data)
                dispatch(deleteModulePermanent(id))
                await getMenus(courseID)
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

    const createExternalTraining = async(data: TrainingDataState, documents: FormData) => {
        console.log(data)
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${API_URL}/training/training-course/`, data, {
                withCredentials: true 
            })
            if(response.status === 200) {
                const data = response.data
                setIsLoading(false)
                await uploadDocsExternalTraining(data.id, documents)
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
    const uploadParticipantDocument = async(trainingID: number, participant: number, data: File[]) => {
        setIsLoading(true)
        setError(null)

        const formData = new FormData()
        data.forEach((item) => {
            formData.append(`document_name`, item.name)
            formData.append(`document`, item)
        })

        try {
            const response = await axios.post(`${API_URL}/training/trainings/${trainingID}/participants/${participant}/documents/upload/`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
            if(response.status === 201) {
                setIsLoading(false)
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

    const uploadDocsExternalTraining = async(id: number, documents: FormData) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.put(`${API_URL}/training/trainings/${id}/upload-document/`, documents, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(response.status === 200) {
                setIsLoading(false)
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

    const retrieveExternalDocuments = async(trainingID: number, participantsID: number) => {
        try {
            const response = await axios.get(`${API_URL}/training/trainings/${trainingID}/participants/${participantsID}/documents/`, {
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

    const retrieveExternalParticipants = async(id: number) => {
        try {
            const response = await axios.get(`${API_URL}/training/trainings/${id}/`, {
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

    const retrieveExternalTraining = async() => {
        try {
            const response = await axios.get(`${API_URL}/training/training-course/`, {
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

    const retrieveCourses = async() => {
        try {
            const response = await axios.get(`${API_URL}/course/courses/`, {
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

    const markComplete = async(trainingID: number, id: number, status: {status: string}) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.patch(`${API_URL}/training/status/${trainingID}/${id}/`, status, {
                withCredentials: true
            })
            if(response.status === 200) {
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

    const publishCourse = async( id: number ) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.patch(`${API_URL}/course/course-status/${id}/`, {course_status: "published"}, {
                withCredentials: true
            })
            if(response.status === 200) {
                setIsLoading(false)
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

    const updateExternalTraining = async(id: number, data: TrainingDataState, documents: FormData) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.put(`${API_URL}/training/trainings/${id}/`, data, {
                withCredentials: true
            })
            if(response.status === 200) {
                setIsLoading(false)
                console.log(response.data)
                await uploadDocsExternalTraining(id, documents)
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

    const getSpecificModule = async(moduleID: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/modules/${moduleID}/`, {
                withCredentials: true
            })
            if(response.status === 200){
                const data = response.data
                console.log(data)
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

    const deleteTrainingDocument = async(docID: number) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.delete(`${API_URL}/training/training-document/${docID}/`, {
                withCredentials: true
            })
            if(response.status === 204){
                console.log(response.data)
                setIsLoading(false)
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

    const deleteUserCourseDocument = async(docID: number) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.delete(`${API_URL}/course/document/${docID}/`, {
                withCredentials: true
            })
            if(response.status === 204){
                console.log(response.data)
                setIsLoading(false)
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

    const getEvaluationRecord = async(courseID: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/user-progress/${courseID}/`, {
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

    const getSurveyAnswers = async(courseID: number) => {
        try {
            const response = await axios.get(`${API_URL}/course/stats-survey/${courseID}/`, {
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

    const deleteTraining = async(trainingID: number) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.delete(`${API_URL}/training/trainings/${trainingID}/`, {
                withCredentials: true
            })
            if(response.status === 204){
                console.log(response.data)
                setIsLoading(false)
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
    handleAddCourse, 
    retrieveTrainees, 
    retrieveExternalParticipants,
    createExternalTraining,
    retrieveExternalTraining,
    handleAddMenu,
    SetMenuTitle,
    handleAddModule,
    handleUpdateCourse,
    handleUpdateModule,
    handleDeleteModule,
    uploadParticipantDocument,
    retrieveExternalDocuments,
    markComplete,
    publishCourse,
    retrieveCourses,
    deleteCourse,
    deleteMenu,
    updateExternalTraining,
    getSpecificModule,
    deleteTrainingDocument,
    deleteUserCourseDocument,
    getEvaluationRecord,
    getSurveyAnswers,
    deleteTraining,
    isLoading, 
    error }
}

export default useTrainingOfficer