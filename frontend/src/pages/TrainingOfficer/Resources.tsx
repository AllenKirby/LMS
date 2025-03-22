import { useState } from "react"
import { ResourcesViewModal } from "../../Components";

const Resources = () => {
  const [viewResource, setViewResource] = useState<boolean>(false);
    
  const handleViewResources = () => {
    setViewResource(!viewResource)
  };

  return (
    <section className="w-full h-full px-7 py-5 text-f-dark bg-content-bg flex flex-col">
      <article 
        className="w-[400px] h-[160px] flex flex-col justify-between rounded-xl bg-white shadow-md group cursor-pointer p-3"
        onClick={handleViewResources}
      >
          <p className="text-p-rg text-f-dark font-semibold">Course Title</p>
          <div className="font-medium text-p-sm text-c-grey-50">
            <p>3 Files</p>
            <p>1 Image</p>
            <p>2 Video Links</p>
          </div>
      </article>
      {viewResource && <ResourcesViewModal onClose={handleViewResources}/>}
    </section>
  )
}

export default Resources