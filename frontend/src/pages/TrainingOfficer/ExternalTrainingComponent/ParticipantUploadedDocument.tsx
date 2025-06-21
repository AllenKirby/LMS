import { ExternalParticipantState, TrainingDataState } from '../../../types/CourseCreationTypes';
import { UserState } from '../../../types/UserTypes';

import { useTraineeHook, useTrainingOfficerHook } from '../../../hooks';

import FileIcon from '../../../assets/file.png';
import { IoClose } from 'react-icons/io5';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

type ParticipantUploadedDocumentProps = {
  onClose: () => void;
  data: ExternalParticipantState;
  trainingID: number;
  trainingData?: TrainingDataState;
};

interface FilesState {
  document_status: 'pending' | 'incomplete' | 'completed';
  documents: { doc_id: number; doc_name: string; doc_url: string }[];
}

const ParticipantUploadedDocument: React.FC<ParticipantUploadedDocumentProps> = React.memo((props) => {
  const { onClose, data, trainingID, trainingData = {} } = props
  const openInput = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FilesState>();
  const [necessaryDocs, setNecessaryDocs] = useState<{ document_url: { document_id: number; doc_url: string; doc_name: string }[] }>({ document_url: [] });

  const user = useSelector((state: { user: UserState }) => state.user);
  const API_URL = import.meta.env.VITE_URL;

  const { uploadParticipantDocument, retrieveExternalDocuments, markComplete } = useTrainingOfficerHook();
  const { deleteUserTrainingDocument, getExternalTrainingDocuments } = useTraineeHook();

  useEffect(() => {
    const init = async () => {
      const docs = await retrieveExternalDocuments(trainingID, data.id);
      if (docs) setUploadedFiles(docs);

      const neededDocs = await getExternalTrainingDocuments(trainingID);
      if (neededDocs) setNecessaryDocs(neededDocs);
    };
    init();
  }, []);

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selected]);
    }
  };

  const uploadDocs = () => openInput.current?.click();

  const bytesToMB = (bytes: number) => (bytes / 1048576).toFixed(2);

  const uploadFile = async () => {
    await uploadParticipantDocument(trainingID, data.id, files);
    setFiles([]);
    const docs = await retrieveExternalDocuments(trainingID, data.id);
    if (docs) setUploadedFiles(docs);
  };

  const markAsComplete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('complete')
    const res = await markComplete(trainingID, data.id, { status: 'completed' });
    if(res){
      onClose();
    }
  };

  const deleteUploadedDoc = async(docID: number) => {
    await deleteUserTrainingDocument(docID)
    setUploadedFiles(prevData => {
      if (!prevData) return undefined;
      return {
        ...prevData,
        documents: prevData.documents.filter(doc => doc.doc_id !== docID),
      };
    });
  }

  const isOverdue = (dateString: string) => {
    const endDate = new Date(dateString);
    const now = new Date();

    return endDate < now
  }
  console.log(trainingData)
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-30" />
      <div className="fixed inset-0 z-50 flex justify-end">
        <form onSubmit={markAsComplete} onClick={(e) => e.stopPropagation()} className="w-full md:w-2/5 h-full bg-white shadow-lg flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">
              {user.user.role === 'training_officer' ? `${data.first_name} ${data.last_name}` : (trainingData as TrainingDataState).training_title}
            </h2>
            <button onClick={onClose} type="button" className="text-gray-600 hover:text-red-600 text-2xl">
              &times;
            </button>
          </header>

          {/* Necessary Docs */}
          <div className="p-6 overflow-y-auto flex-1">
            <section className="mb-6">
              <h3 className="text-lg font-medium mb-3">Necessary Training Documents</h3>
              {necessaryDocs?.document_url?.length > 0 ? (
                necessaryDocs.document_url.map(item => (
                  <a
                    key={item.document_id}
                    href={`${API_URL}/${item.doc_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 border rounded hover:bg-gray-100 transition mb-2"
                  >
                    <img src={FileIcon} alt="Document" className="w-6 h-6" />
                    <span className="font-medium">{item.doc_name}</span>
                  </a>
                ))
              ) : (
                <p className="text-gray-500 italic">No necessary documents listed.</p>
              )}
            </section>

            {/* Upload Section (Trainee Only) */}
            {(data.status !== 'completed' && user.user.role === 'trainee' && !isOverdue((trainingData as TrainingDataState).end_date)) && (
              <section className="mb-6">
                <button
                  type="button"
                  onClick={uploadDocs}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600 hover:bg-gray-50"
                >
                  <input type="file" className="hidden" ref={openInput} onChange={handleFileUpload} />
                  <div>
                    <p className="font-medium">Click to Upload Document</p>
                    <small>(Max. 20MB)</small>
                  </div>
                </button>

                {/* New Files Preview */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-4 border rounded p-2">
                        <img src={FileIcon} alt="File" className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="font-medium">{file.name}</p>
                          <small className="text-gray-500">{bytesToMB(file.size)} MB</small>
                        </div>
                        <button onClick={() => removeFile(idx)} type="button" className="text-red-500">
                          <IoClose size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={uploadFile}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Upload
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Uploaded Documents */}
            <section>
              <h3 className="text-lg font-medium mb-3">Uploaded Documents</h3>
              {uploadedFiles?.documents?.length ? (
                uploadedFiles.documents.map(doc => (
                  <div
                    key={doc.doc_id}
                    className="flex items-center justify-between border p-3 rounded mb-2 hover:bg-gray-50 transition"
                  >
                    <a href={doc.doc_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      <img src={FileIcon} alt="File" className="w-5 h-5" />
                      <span>{doc.doc_name}</span>
                    </a>
                    {(user.user.role === 'trainee' && data.status !== 'completed') && (
                      <button
                        type="button"
                        onClick={() => deleteUploadedDoc(doc.doc_id)}
                        className="text-red-500 text-xl"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No documents uploaded yet.</p>
              )}
            </section>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t">
            {!isOverdue((trainingData as TrainingDataState).end_date) ? data.status !== 'completed' && user.user.role === 'training_officer' ? (
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
              >
                Mark as Complete
              </button>
            ) : data.status === 'completed' ? (
              <div className="text-center text-green-600 font-medium">Completed</div>
            ) : null : (
              <div className="text-center text-red-600 font-medium">This training is overdue and file uploads are no longer allowed.</div>
            )}
          </div>
        </form>
      </div>
    </>
  );
});

export default ParticipantUploadedDocument;
