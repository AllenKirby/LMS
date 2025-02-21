import React from "react";

const TopPerformer: React.FC = () => {
  const dummy = [
    {
      name: "Michael Smith",
      department: "Computer Science",
      courseCompleted: "3 courses completed",
      score: 98,
    },
    {
      name: "Emily Johnson",
      department: "Data Science",
      courseCompleted: "10 courses completed",
      score: 95,
    },
    {
      name: "Daniel Brown",
      department: "Software Engineering",
      courseCompleted: "12 courses completed",
      score: 92,
    },
    {
      name: "Sophia Martinez",
      department: "Cybersecurity",
      courseCompleted: "12 courses completed",
      score: 90,
    },
    {
      name: "William Davis",
      department: "Artificial Intelligence",
      courseCompleted: "8 courses completed",
      score: 88,
    },
    {
      name: "Olivia Wilson",
      department: "Cloud Computing",
      courseCompleted: "7 courses completed",
      score: 85,
    },
    {
      name: "James Taylor",
      department: "Networking",
      courseCompleted: "4 courses completed",
      score: 82,
    },
    {
      name: "Isabella Anderson",
      department: "UI/UX Design",
      courseCompleted: "16 courses completed",
      score: 80,
    },
    {
      name: "Alexander Thomas",
      department: "Machine Learning",
      courseCompleted: "20 courses completed",
      score: 78,
    },
    {
      name: "Charlotte White",
      department: "Blockchain Development",
      courseCompleted: "5 courses completed",
      score: 75,
    },
  ];

  return (
    <section className="w-full h-full">
      {dummy.map((user, index) => {
        return (
          <div
            className="bg-c-grey-10 rounded-md p-3 flex gap-3 mb-5"
            key={index}
          >
            <div className="w-20 h-20 rounded-md bg-c-blue-90"></div>
            <section>
              <article>
                <p className="font-medium">{user.name}</p>
                <p className="text-p-sm text-c-grey-50 -mt-1">
                  {user.department}
                </p>
              </article>
              <div className="flex gap-3 mt-2">
                <div className="px-2 py-1 w-fit text-p-sm bg-white shadow-sm rounded-sm">
                  {user.courseCompleted}
                </div>
                <div className="px-2 py-1 w-fit text-p-sm bg-white shadow-sm rounded-sm">
                  Score: {user.score}
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </section>
  );
};

export default TopPerformer;
