//assets
import { MdOutlineCalendarToday } from "react-icons/md";

const TrainingCard: React.FC = () => {
  const dummyData = [
    {
      Title: "Security Summit 2023",
      Setup: "Face to Face",
      Host: "Nigeria Police Force",
      DateFrom: "06/10/2023",
      DateTo: "06/10/2023",
      Venue: "Nigeria Police Force Headquarters, Abuja",
    },
    {
      Title: "Cybersecurity Awareness Webinar",
      Setup: "Virtual",
      Host: "TechSecure Inc.",
      DateFrom: "06/15/2023",
      DateTo: "06/15/2023",
      Venue: "Zoom",
    },
    {
      Title: "Annual Law Enforcement Conference",
      Setup: "Virtual",
      Host: "Interpol",
      DateFrom: "07/05/2023",
      DateTo: "07/07/2023",
      Venue: "Google Meet",
    },
    {
      Title: "Forensic Science Training",
      Setup: "Face to Face",
      Host: "National Forensic Institute",
      DateFrom: "08/12/2023",
      DateTo: "08/14/2023",
      Venue: "Abuja Training Center",
    },
    {
      Title: "Digital Crime Investigation Workshop",
      Setup: "Virtual",
      Host: "Cyber Crime Bureau",
      DateFrom: "09/20/2023",
      DateTo: "09/21/2023",
      Venue: "Microsoft Teams",
    },
    {
      Title: "Police Leadership Forum",
      Setup: "Face to Face",
      Host: "Nigeria Police Academy",
      DateFrom: "10/01/2023",
      DateTo: "10/03/2023",
      Venue: "Kano State Conference Hall",
    },
    {
      Title: "Emergency Response Planning",
      Setup: "Face to Face",
      Host: "Disaster Management Agency",
      DateFrom: "11/10/2023",
      DateTo: "11/12/2023",
      Venue: "Abuja Disaster Response Center",
    },
    {
      Title: "Criminal Law Update Seminar",
      Setup: "Virtual",
      Host: "Legal Affairs Commission",
      DateFrom: "12/05/2023",
      DateTo: "12/06/2023",
      Venue: "Google Meet",
    },
    {
      Title: "Anti-Terrorism Strategies Workshop",
      Setup: "Face to Face",
      Host: "Defense Intelligence Agency",
      DateFrom: "01/15/2024",
      DateTo: "01/17/2024",
      Venue: "Ministry of Defense, Abuja",
    },
  ];

  return (
    <>
      {dummyData.map((info, index) => (
        <section
          className="relative w-full h-[340px] flex flex-col items-center justify-center rounded-xl bg-white shadow-md group cursor-pointer"
          key={index}
        >
          <div className="w-full h-full bg-black opacity-0 group-hover:opacity-10 absolute rounded-xl flex items-center justify-center transition-opacity duration-300">
            {/*Action button / o ano*/}
          </div>
          <div className="w-full h-full">
            <figure className="w-full h-2/5">
              <img
                alt="Status-img"
                className="object-cover w-full h-full rounded-t-xl bg-gradient-to-r from-c-blue-10 to-c-green-20"
              />
            </figure>
            <main className="w-full h-3/5 flex flex-col items-center justify-between p-5">
              <section className="w-full">
                <p className="text-p-sc font-medium text-c-green-50">
                  {info.Setup}
                </p>
                <h1 className="text-p-lg font-semibold w-full">{info.Title}</h1>
                <p className="text-p-rg text-c-grey-70 w-full">{info.Host}</p>
              </section>
              <article className="w-full flex flex-col gap-1 text-p-sm">
                <p className="text-f-dark font-medium">{info.Venue}</p>
                <p className="text-c-grey-70 flex items-center gap-1">
                  <MdOutlineCalendarToday size={15} />
                  {info.DateFrom} - <MdOutlineCalendarToday size={15} />
                  {info.DateTo}
                </p>
              </article>
            </main>
          </div>
        </section>
      ))}
    </>
  );
};

export default TrainingCard;
