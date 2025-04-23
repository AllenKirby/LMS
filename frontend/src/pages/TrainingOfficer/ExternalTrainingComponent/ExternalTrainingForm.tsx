import { IoMdClose } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import ParticipantsList from "../ParticipantsList";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useTrainingOfficerHook } from "../../../hooks";

import { defaultSelect } from "../../../assets/Util/SelectStyle";
import { defaultInput } from "../../../assets/Util/InputStyle";

import {TrainingDataState} from '../../../types/CourseCreationTypes'
// import { UserState } from '../../../types/UserTypes'

type ExternalTrainingForm = {
  modal: () => void;
  data? : TrainingDataState;
  flag: boolean
};

interface Trainees {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  sex: string;
  department: string;
  birth_date: string;
  contact: string;
  address: string;
}

const ExternalTrainingForm: React.FC<ExternalTrainingForm> = (props) => {
  const { modal, data = {} as TrainingDataState, flag } = props;
  const [uploadedFile, setUploadedFile] = useState<File[] | []>([])
  const [files, setFiles] = useState<{document_id: number, doc_name: string, doc_url: string}[]>([])
  const inputClick = useRef<HTMLInputElement>(null)
  const [trainingData, setTrainingData] = useState<TrainingDataState>({
    training_setup: '',
    training_title: '',
    start_date: '',
    end_date: '',
    // resource_speakers: [],
    training_provider: '',
    venue: '',
    participants: []
  })
  const [counter, setCounter] = useState<number>(1);
  const { createExternalTraining, retrieveExternalParticipants, updateExternalTraining, deleteTrainingDocument} = useTrainingOfficerHook()

  //redux
  const trainees = useSelector((state: {trainees: {trainees: Trainees[]}}) => state.trainees)
  //const user = useSelector((state: {user: UserState}) => state.user)

  const VITE_URL = import.meta.env.VITE_URL

  useEffect(() => {
    const training = async() => {
      if(data && flag) {
        const response: TrainingDataState = await retrieveExternalParticipants(Number(data.id))
        console.log(response)
        if(response.document_url){
          setFiles(response.document_url)
        } 
        const emails = response.participants_display ? response.participants_display.map(item => item.email) : []
        setTrainingData({
          training_setup: data.training_setup || '',
          training_title: data.training_title || '',
          start_date: data?.start_date?.split("T")[0] || '',
          end_date: data?.end_date?.split("T")[0] || '',
          // resource_speakers: [],
          training_provider: data.training_provider || '',
          venue: data.venue || '',
          participants: [...emails]
        })
      }
    }
    training()
    console.log(data)
  }, [data, flag])


  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const decrement = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const checked = event.target.checked;
  
    setTrainingData((prevData) => ({
      ...prevData,
      participants: checked
        ? [...(prevData.participants || []), value]
        : (prevData.participants || []).filter((val) => val !== value)
    }));
  };  
  
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    uploadedFile.forEach((item) => {
      formData.append("document_name", item.name);
      formData.append("document", item);
    });
    await createExternalTraining(trainingData, formData)
    modal()
  }

  const handleUpdate = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()

    uploadedFile.forEach((item) => {
      formData.append("document_name", item.name);
      formData.append("document", item);
    });
    await updateExternalTraining(Number(data.id), trainingData, formData)
    modal()
  }

  const handleDeleteDoc = async(docID: number) => {
    const response = await deleteTrainingDocument(docID)
    console.log(response)
  }

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputSpeaker(e.target.value)
  // }

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault()
  //     if(inputSpeaker.trim() !== "") {
  //       setTrainingData(prevData => ({
  //         ...prevData, 
  //         resource_speakers: [...prevData.resource_speakers, { host_name: inputSpeaker.trim() }] // Append object
  //       }));
  //       setInputSpeaker("");
  //     }
  //   }
  // };

  // const removeParticipant = (index: number) => {
  //   setTrainingData(prevData => ({
  //     ...prevData,
  //     resource_speakers: prevData.resource_speakers.filter((_, i) => i !== index) // Remove item at index
  //   }));
  // };

  const uploadDocs = () => {
    inputClick.current?.click()
  }

  const removeFile = (index: number) => {
    setUploadedFile((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files; // This is FileList | null

    if (selectedFiles) {
      // Convert FileList to an array
      const newFiles = Array.from(selectedFiles);

      // Update state without overwriting previous files
      setUploadedFile((prev) => [...prev, ...newFiles]);
    }
  };

  useEffect(() => {
    console.log(trainingData)
  },[trainingData])

  // useEffect(() => {
  //   setTrainingData({
  //     training_setup: data.training_setup,
  //     training_title: '',
  //     start_date: '',
  //     end_date: '',
  //   // resource_speakers: [],
  //   training_provider: '',
  //   venue: '',
  //   participants: []
  //   })
  // },[data])

  return (
    <>
      <div className="fixed inset-0 z-20 bg-black opacity-50 text-f-dark" />
      <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-end">
        <form onSubmit={flag ? handleUpdate : handleSubmit} className="w-2/5 h-full bg-f-light z-30 flex flex-col">
          <div className="w-full p-5 flex items-center justify-between border-b">
            <h1 className="font-medium text-p-lg">External Training</h1>
            <button type="button" onClick={modal}>
              <IoMdClose />
            </button>
          </div>
          <div className="w-full flex-1 overflow-y-auto p-5">
            {counter === 1 && (
              <div className="w-full h-fit flex flex-col gap-5">
                <div className="flex flex-col">
                  <label className="text-p-sm">Training Setup</label>
                  <select
                    value={trainingData.training_setup} 
                    onChange={(e) => setTrainingData({...trainingData, training_setup: e.target.value})} 
                    className={defaultSelect}>
                    <option value="" disabled>Select Training Setup</option>
                    <option value="virtual">Virtual</option>
                    <option value="ftf">Face-to-Face</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-p-sm">Training Title</label>
                  <input
                    type="text"
                    value={trainingData.training_title} 
                    onChange={(e) => setTrainingData({...trainingData, training_title: e.target.value})} 
                    className={defaultInput}>
                    
                  </input>
                </div>
                <div className="w-full flex gap-5 items-center justify-center">
                  <div className="w-1/2 flex flex-col">
                    <label className="text-p-sm">Start Date</label>
                    <input 
                      type="date" 
                      value={trainingData.start_date} 
                      onChange={(e) => setTrainingData({...trainingData, start_date: e.target.value})} 
                      className={defaultSelect}/>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <label className="text-p-sm">End Date</label>
                    <input 
                      type="date"
                      value={trainingData.end_date} 
                      onChange={(e) => setTrainingData({...trainingData, end_date: e.target.value})} 
                      className={defaultSelect}/>
                  </div>
                </div>
                {/* <div className="flex flex-col">
                  <label className="text-p-sm">Speaker</label>
                  <input
                    type="text"
                    className={defaultInput}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}/>
                  <div className="mt-1 w-full h-fit flex flex-col gap-1">
                    {trainingData.resource_speakers.map((item, index) => (
                      <div key={index} className="w-full h-fit flex items-center justify-between">
                        <li key={index}>{item.host_name}</li>
                        <button type="button" onClick={() => removeParticipant(index)}>&times;</button>
                      </div>
                    ))}
                  </div>
                </div> */}
                <div className="flex flex-col">
                  <label className="text-p-sm">Training Provider</label>
                  <input 
                    type="text"
                    className={defaultInput}
                    value={trainingData.training_provider}
                    onChange={(e) => setTrainingData({...trainingData, training_provider: e.target.value})}>

                  </input>
                </div>
                <div className="flex flex-col">
                  <label className="text-p-sm">Venue</label>
                  <input 
                    type="text"
                    className={defaultInput}
                    value={trainingData.venue}
                    onChange={(e) => setTrainingData({...trainingData, venue: e.target.value})}>

                  </input>
                </div>
                <button
                  onClick={uploadDocs}
                  type="button"
                  className="w-full h-40 border-2 border-dashed rounded-md"
                >
                  <input type="file" ref={inputClick} onChange={handleFileUpload} className="hidden"/>
                  Upload Necessary Document
                </button>
                {uploadedFile?.map((item, index) => (
                  <div key={index} className="w-full h-fit flex items-center justify-between">
                    <li key={index}>{item.name}</li>
                    <button type="button" onClick={() => removeFile(index)}>&times;</button>
                  </div>
                ))}
                <ul>
                  {files?.map((item, index) => (
                    <li key={index} className="w-full h-fit flex items-center justify-between">
                      <a href={`${VITE_URL}${item.doc_url}`} className="text-blue-500 underline">
                        {item.doc_name}
                      </a>
                      <button type="button" onClick={() => handleDeleteDoc(item.document_id)} className="ml-2 text-red-500 text-xl">
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {counter === 2 && 
              <ParticipantsList 
                trainees={trainees} 
                handleCheckBox={handleCheckboxChange}
                participants={trainingData.participants}
                />
            }
          </div>
          <div
            className={`${
              counter === 2 ? "justify-between" : "justify-end"
            } w-full flex items-center p-5`}
          >
            <button
              type="button"
              onClick={decrement}
              className={`${counter === 2 ? "block" : "hidden"}`}
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={increment}
              className={`${
                counter === 2 ? "hidden" : "block"
              } flex items-center justify-center gap-2 font-medium`}
            >
              Select Participant <MdOutlineKeyboardArrowRight size={20} />
            </button>
            <button
              type="submit"
              className={`${
                counter === 2 ? "block" : "hidden"
              } flex items-center justify-center gap-2 font-medium`}
            >
              Set Training <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExternalTrainingForm;
