import { FiSearch, FiFilter, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RxTrackNext, RxTrackPrevious  } from "react-icons/rx";

const trainees = [
  { id: "TR001", name: "John Doe", position: "Intern", department: "Admin", contact: "123-456-7890", email: "johndoe@example.com" },
  { id: "TR002", name: "Jane Smith", position: "Intern", department: "HR", contact: "987-654-3210", email: "janesmith@example.com" },
  { id: "TR003", name: "Alice Brown", position: "Intern", department: "Finance", contact: "111-222-3333", email: "alice@example.com" },
  { id: "TR004", name: "Bob Martin", position: "Intern", department: "Property", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR005", name: "Giga Kneega", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR006", name: "Analyn Muko", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR007", name: "Cathy Cipayko", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR008", name: "Dionegga Ikinamada", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR009", name: "Joriel Salamander", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR010", name: "Jasper Marilag", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR011", name: "Hannah Nicole Jamero", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR012", name: "Danzel Ethanol", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR013", name: "Junas Tagilid", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },
  { id: "TR014", name: "Russil Gyatt Namoro", position: "Intern", department: "IT", contact: "444-555-6666", email: "bob@example.com" },

];

const Employees = () => {
  return (  
    <section className="w-full h-full shadow-md rounded-md px-12 py-7 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Trainees</h1>
        <div className="flex gap-2">
          <button className="rounded w-8 h-8 bg-gray-200 flex items-center justify-center">
            <FiSearch size={18} />
          </button>
          <button className="rounded w-8 h-8 bg-gray-200 flex items-center justify-center">
            <FiFilter size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full table-fixed border-collapse border-t border-b border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 w-[3%] text-center">
              <input type="checkbox" className="w-4 h-4 border-gray-200 accent-green-800 rounded focus:ring focus:ring-gray-300" />
            </th>
            <th className="border border-gray-300 p-3 text-left w-[7.5%]">Trainee ID</th>
            <th className="border border-gray-300 p-3 text-left w-[12.5%]">Full Name</th>
            <th className="border border-gray-300 p-3 text-left w-[10.5%]">Position</th>
            <th className="border border-gray-300 p-3 text-left w-[9.5%]">Department</th>
            <th className="border border-gray-300 p-3 text-left w-[12.5%]">Contact Number</th>
            <th className="border border-gray-300 p-3 text-left w-[12.5%]">Email Address</th>
            <th className="border border-gray-300 p-3 text-center w-[5%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {trainees.map((trainee) => (
            <tr key={trainee.id} className="hover:bg-gray-50">
              <td className="border-l border-r border-gray-300 p-3 text-center">
                <input type="checkbox" className="w-4 h-4 border-gray-200 accent-green-800 rounded focus:ring focus:ring-gray-300" />
              </td>
              <td className="border-l border-r border-gray-300 p-3 w-[7.5%]">{trainee.id}</td>
              <td className="border-l border-r border-gray-300 p-3 w-[12.5%]">{trainee.name}</td>
              <td className="border-l border-r border-gray-300 p-3 w-[10.5%]">{trainee.position}</td>
              <td className="border-l border-r border-gray-300 p-3 w-[9.5%]">{trainee.department}</td>
              <td className="border-l border-r border-gray-300 p-3 w-[12.5%]">{trainee.contact}</td>
              <td className="border-l border-r border-gray-300 p-3 w-[12.5%]">{trainee.email}</td>
              <td className="border-l border-r border-gray-300 p-3 w-[12.5%] text-center">
                <div className="flex justify-center">
                  <select
                    onChange={(e) => e.target.blur()} 
                    onBlur={(e) => e.target.value = "..."}
                    className="bg-transparent border-transparent appearance-none outline-none text-center text-black"
                  >
                    <option value="..." hidden>...</option>
                    <option className="text-left" value="edit">Edit</option>
                    <option className="text-left" value="delete">Delete</option>
                    <option className="text-left" value="add">Add to Course</option>
                  </select>
                </div>
              </td>



            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        {/* Rows Per Page */}
        <div className="flex items-center gap-2">
          <h6 className="text-sm font-medium">Rows per page</h6>
          <select className="border border-gray-200 bg-gray-200 rounded px-2 py-1 text-sm">
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Controls */}


        <div className="flex items-center gap-0">
          <p className="text-xs font-medium pr-3">1 - 10 of 200</p>
          <button className="flex items-center justify-center text-xs font-medium w-6 h-6 rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5">
            <RxTrackPrevious  className="h-3 w-3" />
          </button>
          <button className="flex items-center justify-center text-xs font-medium w-6 h-6 rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5">
            <FiChevronLeft className="h-3 w-3 stroke-2" />
          </button>

          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} className="text-xs font-medium w-6 h-6 rounded-md bg-transparent text-stone-800 hover:bg-stone-800/5">
              {num}
            </button>
          ))}

          <button className="flex items-center justify-center text-xs font-medium w-6 h-6 rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5">
            <FiChevronRight className="h-3 w-3 stroke-2" />
          </button>
          <button className="flex items-center justify-center text-xs font-medium w-6 h-6 rounded-md bg-transparent border-transparent text-stone-800 hover:bg-stone-800/5">
            <RxTrackNext className="h-3 w-3" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Employees;
