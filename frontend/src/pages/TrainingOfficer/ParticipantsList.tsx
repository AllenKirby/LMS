
import { FiSearch, FiFilter } from "react-icons/fi";

const ParticipantsList = () => {
  return (
    <section className="w-full h-full flex flex-col gap-3">
        <div className="flex items-center justify-between">
        <h1 className="text-h-h6 font-medium">0 Participants</h1>
        <div className="flex gap-2">
            <button className="p-2 bg-c-grey-5 rounded-md"><FiSearch size={20}/></button>
            <button className="p-2 bg-c-grey-5 rounded-md"><FiFilter size={20}/></button>
        </div>
        </div>
        <table className="w-full flex-1 border">
        <thead className="bg-c-blue-5">
            <tr className="rounded-t-md">
            <th className="p-3 border-r-2"><input type="checkbox" className="scale-150"/></th>
            <th className="p-3 border-r-2">Full Name</th>
            <th className="p-3 border-r-2">Position</th>
            <th className="p-3">Department</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
            <tr>
            <td className="p-3 border-r-2 text-center"><input type="checkbox" className="scale-150"/></td>
            <td className="p-3 border-r-2 text-center">Allen Kirby</td>
            <td className="p-3 border-r-2 text-center">Intern</td>
            <td className="p-3 border-r-2 text-center">IT</td>
            </tr>
        </tbody>
        </table>
    </section>
  )
}

export default ParticipantsList