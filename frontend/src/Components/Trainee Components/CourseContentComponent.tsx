import FileIcon from "../../assets/file.png"
import { LessonState, FileUploadState } from '../../types/CourseCreationTypes'

interface CourseProps {
  content: LessonState | FileUploadState;
}

const CourseContentComponent: React.FC<CourseProps> = (props) => {
  const {content} = props
  return (
    <>
      {content.type === "separator" && (
        <article className="w-full flex flex-col gap-3 px-10">
          <h6 className="text-h-h6 font-medium text-f-dark">
            {content.title}
          </h6>
          <pre className="w-full text-p-rg text-wrap">
            {content.content}
          </pre>
        </article>
      )}
      {content.type === "document" && (
        <div className="flex items-center justify-center p-2 rounded-md border mx-10">
          <img src={FileIcon} alt="file" />
          <div className="w-full flex flex-col">
            <h2>Sample_fileName</h2>
            <h3 className="text-sm text-f-gray">2 MB</h3>
          </div>
        </div>
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
};

export default CourseContentComponent;
