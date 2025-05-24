import FileIcon from "../../assets/file.png"
import { LessonState, DocumentState } from '../../types/CourseCreationTypes'
import HTMLReactParser from "html-react-parser/lib/index";
import React from "react";

interface CourseProps {
  content: LessonState | DocumentState;
}

const CourseContentComponent: React.FC<CourseProps> = React.memo((props) => {
  const {content} = props
  const API_URL = import.meta.env.VITE_URL
  return (
    <>
      {content.type === "separator" && (
        <article className="w-full flex flex-col gap-3">
          <h6 className="text-h-h6 font-medium text-f-dark">
            {HTMLReactParser(content.title)}
          </h6>
          <pre className="w-full text-p-rg text-wrap">
            {HTMLReactParser(content.content)}
          </pre>
        </article>
      )}
      {content.type === "document" && (
        <a href={`${API_URL}/course${content.values.document_url}`} className="flex w-full items-center justify-center p-2 rounded-md border">
          <img src={FileIcon} alt="file" />
          <div className="w-full flex flex-col">
            <h2>{content.values.document_name}</h2>
            <h3 className="text-sm text-f-gray">View Document</h3>
          </div>
        </a>
      )}
      {/* {type === "Separator" && (
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
      )} */}
    </>
  );
});

export default CourseContentComponent;
