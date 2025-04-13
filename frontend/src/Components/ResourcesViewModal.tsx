import React, { useEffect, useState } from "react";
import { useTraineeHook } from "../hooks";
import { useSelector } from "react-redux";
import { UserState } from '../types/UserTypes'

interface Document {
  document_name: string;
  document_url: string;
  id: number;
}

interface Module {
  documents: Document[];
}

interface Section {
  modules?: Module[];
}

interface ResourcesViewModalProps {
    onClose: () => void;
    id: number;
  }
  
  const ResourcesViewModal: React.FC<ResourcesViewModalProps> = (props) => {
    const {onClose, id} = props
    const { getUserResources } = useTraineeHook()
    const user = useSelector((state: {user: UserState}) => state.user)
    const [courseDocuments, setCourseDocuments] = useState<{document_name: string, document_url: string, id: number}[][]>([])
    const VITE_URL = import.meta.env.VITE_URL

    useEffect(() => {
      const getDocuments = async() => {
        const response = await getUserResources(user.user.id, id)
        console.log(response)
        setCourseDocuments(
          response.sections
            .flatMap((section : Section) =>
              section.modules
                ?.filter(module => module.documents && module.documents.length > 0)
                .map(module => module.documents) || []
            )
        );
      }
      getDocuments()
    }, [id, user])

    console.log(courseDocuments)
  return (
    <section className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 ">
      <div className="w-2/3 h-2/3 z-40 rounded-md bg-white p-4 shadow-lg flex flex-col">
        <header className="w-full flex items-center justify-between border-b pb-2">
          <p className="text-lg font-semibold">Resources Documents</p>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-700 hover:text-black"
          >
            &times;
          </button>
        </header>
        <div className="p-4 flex-1 overflow-y-auto">
          {courseDocuments.map((documents, index) => (
            <div key={index} className="mb-4">
              {documents.map((document) => (
                <div key={document.id} className="p-2 border rounded mb-2">
                  <p className="font-medium">{document.document_name}</p>
                  <a
                    href={`${VITE_URL}/course${document.document_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesViewModal;
