import FileIcon from "../../../assets/file.png";
import React from "react";

type CourseContentProps = {
  type: "TextDescription" | "LongText" | "FileAttachment" | "Separator" | "Link";
}

const CourseContentComponent: React.FC<CourseContentProps> = React.memo(({ type }) => {
  return (
    <>
      {type === "TextDescription" && (
        <article className="w-full flex flex-col gap-3 px-10">
          <h6 className="text-h-h6 font-medium text-f-dark">
            How to Train your Dragon!
          </h6>
          <pre className="w-full text-p-rg text-wrap">
            Eye clinics often face inefficiencies in managing patient data and
            treatment histories. Traditional paper records pose risks of data
            loss, hinder quick retrieval, and compromise patient privacy, while
            medical scribing is time-consuming and adds to clinicians’
            workloads.
          </pre>
        </article>
      )}
      {type === "LongText" && (
        <pre className="w-full text-p-rg text-wrap px-10">
          Eye clinics often face inefficiencies in managing patient data and
          treatment histories. Traditional paper records pose risks of data
          loss, hinder quick retrieval, and compromise patient privacy, while
          medical scribing is time-consuming and adds to clinicians’ workloads.
        </pre>
      )}
      {type === "FileAttachment" && (
        <div className="flex items-center justify-center p-2 rounded-md border mx-10">
          <img src={FileIcon} alt="file" />
          <div className="w-full flex flex-col">
            <h2>Sample_fileName</h2>
            <h3 className="text-sm text-f-gray">2 MB</h3>
          </div>
        </div>
      )}
      {type === "Separator" && (
        <div className="w-full h-[240px] bg-c-green-40 flex items-center p-10 my-10">
          <h6 className="text-h-h6 font-semibold text-f-light">
            Separator Title/Text
          </h6>
        </div>
      )}
      {type === "Link" && (
        <div className="w-full px-10">
          <a href="https://www.youtube.com" target="_blank">
            sample link
          </a>
        </div>
      )}
    </>
  );
});

export default CourseContentComponent;
