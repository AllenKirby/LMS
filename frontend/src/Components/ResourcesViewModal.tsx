import React, { useEffect } from "react";
import { useTraineeHook } from "../hooks";
import { useSelector } from "react-redux";
import { UserState } from '../types/UserTypes'

interface ResourcesViewModalProps {
    onClose: () => void;
    id: number;
  }
  
  const ResourcesViewModal: React.FC<ResourcesViewModalProps> = (props) => {
    const {onClose, id} = props
    const { getUserResources } = useTraineeHook()
    const user = useSelector((state: {user: UserState}) => state.user)

    useEffect(() => {
      const getDocuments = async() => {
        const response = await getUserResources(user.user.id, id)
        console.log(response)
      }
      getDocuments()
    }, [id, user])
  return (
    <section className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10">
      <div className="w-2/3 h-2/3 z-40 rounded-md bg-white p-4 shadow-lg">
        <header className="w-full flex items-center justify-between border-b pb-2">
          <p className="text-lg font-semibold">Resources Documents</p>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-700 hover:text-black"
          >
            &times;
          </button>
        </header>
        <div className="p-4">
          <p>List of documents, images, and videos...</p>
        </div>
      </div>
    </section>
  );
};

export default ResourcesViewModal;
