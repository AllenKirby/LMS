import { ExternalParticipantState } from '../../../types/CourseCreationTypes';

import { useTrainingOfficerHook } from '../../../hooks';

import FileIcon from '../../../assets/file.png'
import { IoClose } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';

type ParticipantUploadedDocumentProps = {
  onClose: () => void;
  data: ExternalParticipantState;
  trainingID: number;
};
interface FilesState {
  document_status: 'pending' | 'incomplete' | 'completed';
  documents: {doc_id: number, doc_name: string, doc_url: string}[]
}

const ParticipantUploadedDocument: React.FC<ParticipantUploadedDocumentProps> = (props) => {
  const { onClose, data, trainingID } = props

  const openInput = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<FilesState>()

  const { uploadParticipantDocument, retrieveExternalDocuments, markComplete } = useTrainingOfficerHook()

  useEffect(() => {
    const retrieveFiles = async() => {
      const res = await retrieveExternalDocuments(trainingID, data.id)
      if(res) {
        setUploadedFiles(res)
      } 
    }
    retrieveFiles()
  }, [])

  const removeFile = (index: number) => {
    setFiles((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const uploadDocs = () => {
    openInput.current?.click()
  }

  const bytesToMB = (bytes: number) => {
    const MB = bytes / 1048576; // 1 MB = 1,048,576 bytes
    return MB;
  }

  const uploadFile = async() => {
    console.log(data.id)
    await uploadParticipantDocument(trainingID, data.id, files)
    onClose()
  }

  const markAsComplete = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const status = {
      status: 'completed'
    }

    await markComplete(trainingID, data.id, status)
    onClose()
  } 

  console.log(data.status)

  return (
    <>
      <div className="fixed inset-0 z-20 bg-black opacity-20" />
      <div onClick={(e) => e.stopPropagation()} className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-end">
        <form onSubmit={markAsComplete} className="w-2/5 h-full bg-f-light z-30 flex flex-col text-f-dark">
          <header className="flex items-center justify-between px-5 py-3">
            <h6 className="text-p-lg font-medium">{`${data.first_name} ${data.last_name}`}</h6>
            <button onClick={onClose}>&times;</button>
          </header>
          <div className='flex-1 overflow-y-auto p-4'>
            {data.status !== 'completed' && (
              <button type='button' onClick={uploadDocs} className='h-52 w-full rounded-md flex items-center justify-center border-2 border-dashed'>
                <div className='flex flex-col items-center justify-center'>
                  <h2 className='font-medium'>Upload Necessary Document</h2>
                  <p className='text-f-gray'>(Max. 20MB)</p>
                  <input type="file" className='hidden' ref={openInput} onChange={handleFileUpload}/>
                </div>
              </button>
            )}
            <div className='flex flex-col py-4'>
              {files.map((item, index) => (
                <div className='flex items-center justify-center p-2 rounded-md border'>
                  <img src={FileIcon} alt="file" />
                  <div className='w-full flex flex-col'>
                    <h2>{item.name}</h2>
                    <h3 className='text-sm text-f-gray'>{`${bytesToMB(item.size).toFixed(2)}MB`}</h3>
                  </div>
                  <button onClick={() => removeFile(index)} className='w-fit px-2'><IoClose size={20}/></button>
                </div>
              ))}
              {files.length > 0 && (<button type='button' onClick={uploadFile}>upload</button>)}
            </div>
            <div className='flex flex-col py-4'>
              <h2 className='font-medium'>Uploaded Documents</h2>
              {uploadedFiles?.documents ? uploadedFiles?.documents.map((item) => (
                <a href={item.doc_url} className='flex items-center justify-center p-2 rounded-md border my-1'>
                  <img src={FileIcon} alt="file" />
                  <div className='w-full flex flex-col'>
                    <h2>{item.doc_name}</h2>
                    {/* <h3 className='text-sm text-f-gray'>{`${bytesToMB(item.size).toFixed(2)}MB`}</h3> */}
                  </div>
                </a>
              )) : (
                <div className='w-full h-52 flex items-center justify-center'>
                  <h2>No Uploaded Documents Found</h2>
                </div>
              )}
            </div>
          </div>
          <div className='w-full p-3'>
            {data.status !== 'completed' && (<button type='submit' className='w-full rounded-md py-3 bg-c-green-50 text-f-light'>Mark As Complete</button>)}
            {data.status === 'completed' && (
              <div className='w-full rounded-md py-3 text-f-green text-center'>
                <h1 className='font-medium'>Completed</h1>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default ParticipantUploadedDocument;
