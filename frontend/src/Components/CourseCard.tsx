//assets
import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";

const CourseCard: React.FC = () => {
  const dummyData = [
    {
      Title: "Introduction to Programming",
      Description:
        "This course is designed to introduce students to the basics of programming.",
      Date: "12/12/2021",
      Enrolled: 100,
    },
    {
      Title: "Web Development Fundamentals",
      Description:
        "Learn the core concepts of front-end and back-end web development.",
      Date: "01/15/2022",
      Enrolled: 150,
    },
    {
      Title: "Data Structures & Algorithms",
      Description:
        "Understand essential data structures and algorithms for efficient coding.",
      Date: "03/20/2022",
      Enrolled: 200,
    },
    {
      Title: "UI/UX Design Principles",
      Description:
        "Explore user experience and user interface design techniques.",
      Date: "05/10/2022",
      Enrolled: 120,
    },
    {
      Title: "Machine Learning Basics",
      Description:
        "Get started with the fundamentals of machine learning and AI.",
      Date: "07/05/2022",
      Enrolled: 180,
    },
    {
      Title: "Cybersecurity Essentials",
      Description:
        "Learn about digital security and ethical hacking principles.",
      Date: "08/20/2022",
      Enrolled: 90,
    },
    {
      Title: "Mobile App Development",
      Description:
        "Build cross-platform mobile applications with React Native and Flutter.",
      Date: "09/15/2022",
      Enrolled: 140,
    },
    {
      Title: "Cloud Computing & AWS",
      Description:
        "Understand cloud architecture and Amazon Web Services (AWS).",
      Date: "10/01/2022",
      Enrolled: 110,
    },
    {
      Title: "Python for Data Science",
      Description:
        "Master data analysis, visualization, and machine learning with Python.",
      Date: "11/10/2022",
      Enrolled: 230,
    },
    {
      Title: "Game Development with Unity",
      Description: "Learn game design and programming using Unity and C#.",
      Date: "12/05/2022",
      Enrolled: 170,
    },
    {
      Title: "Advanced Java Programming",
      Description:
        "Deep dive into object-oriented programming and Java frameworks.",
      Date: "01/22/2023",
      Enrolled: 130,
    },
    {
      Title: "Blockchain & Cryptocurrency",
      Description:
        "Explore blockchain technology and how cryptocurrencies work.",
      Date: "02/18/2023",
      Enrolled: 95,
    },
    {
      Title: "Artificial Intelligence & NLP",
      Description:
        "Understand natural language processing and AI model development.",
      Date: "03/12/2023",
      Enrolled: 210,
    },
    {
      Title: "Software Engineering Best Practices",
      Description: "Learn Agile, DevOps, and software architecture principles.",
      Date: "04/30/2023",
      Enrolled: 160,
    },
    {
      Title: "Networking & IT Infrastructure",
      Description: "Understand computer networks, protocols, and IT security.",
      Date: "05/20/2023",
      Enrolled: 115,
    },
    {
      Title: "Full-Stack Web Development",
      Description:
        "Master front-end and back-end development with modern frameworks.",
      Date: "06/10/2023",
      Enrolled: 250,
    },
  ];

  return (
    <>
      {dummyData.map((info, index) => (
        <section
          className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
          key={index}
        >
          <div className="w-full h-full bg-f-dark opacity-0 group-hover:opacity-40 absolute rounded-xl flex items-center justify-center transition-opacity duration-300"></div>
          <h6 className="absolute text-f-light font-semibold text-p-lg opacity-0 group-hover:opacity-100">
            View Course
          </h6>
          <div className="w-full h-full">
            <figure className="w-full h-2/5">
              <img
                //src={CourseImg}
                alt="Course-img"
                className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-30 to-c-green-20"
              />
            </figure>
            <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
              <section className="w-full">
                <p className="text-p-sc font-medium text-c-green-50">
                  Category
                </p>
                <h1 className="text-p-lg font-semibold w-full">{info.Title}</h1>
              </section>
              <p className="text-p-rg text-c-grey-70 w-full">
                {info.Description}
              </p>
              <article className="w-full flex items-center justify-between text-p-sm">
                <p className="text-c-grey-70 flex items-center justify-center gap-1">
                  <MdOutlineCalendarToday size={15} />
                  {info.Date}
                </p>
                <p className="text-c-grey-70 flex items-center justify-center gap-1">
                  <LuUsers size={16} />
                  {info.Enrolled} Enrolled
                </p>
              </article>
            </main>
          </div>
        </section>
      ))}
    </>
  );
};

export default CourseCard;
