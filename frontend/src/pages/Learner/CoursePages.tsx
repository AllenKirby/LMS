import CourseContentComponent from "./samples/CourseContentComponent";

const CoursePages = () => {
  return (
    <section className="w-full h-full bg-c-blue-10 flex items-center justify-center">
      <div className="w-3/4 h-full bg-white flex flex-col gap-5 py-10">
        <CourseContentComponent type="TextDescription" />
        <CourseContentComponent type="LongText" />
        <CourseContentComponent type="FileAttachment" />
        <CourseContentComponent type="Separator" />
        <CourseContentComponent type="Link" />
      </div>
    </section>
  );
};

export default CoursePages;
