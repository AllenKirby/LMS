import React from "react";

type ExternalParticipantCardProps = {
  onClick: () => void;
};

const ExternalParticipantCard: React.FC<ExternalParticipantCardProps> = (
  props
) => {
  const dummyData = [
    {
      Name: "John Doe",
      Department: "Department of Computer Science",
      Status: "Completed",
    },
    {
      Name: "Jane Doe",
      Department: "Department of Computer Science",
      Status: "Incomplete",
    },
    {
      Name: "John Doe",
      Department: "Department of Computer Science",
      Status: "Pending",
    },
    {
      Name: "Jane Doe",
      Department: "Department of Computer Science",
      Status: "Incomplete",
    },
    {
      Name: "John Doe",
      Department: "Department of Computer Science",
      Status: "Pending",
    },
    {
      Name: "Jane Doe",
      Department: "Department of Computer Science",
      Status: "Completed",
    },
    {
      Name: "John Doe",
      Department: "Department of Computer Science",
      Status: "Pending",
    },
    {
      Name: "Jane Doe",
      Department: "Department of Computer Science",
      Status: "Completed",
    },
  ];
  return (
    <>
      {dummyData.map((info, index) => (
        <section
          className="w-full h-[160px] flex flex-col justify-between rounded-xl bg-white shadow-md group cursor-pointer text-c-grey-50 p-3"
          key={index}
          onClick={props.onClick}
        >
          <p className="w-full text-p-sc font-medium text-end">{info.Status}</p>
          <article>
            <h6 className="text-p-rg font-medium text-f-dark">{info.Name}</h6>
            <p className="text-p-sm">{info.Department}</p>
          </article>
        </section>
      ))}
    </>
  );
};

export default ExternalParticipantCard;
