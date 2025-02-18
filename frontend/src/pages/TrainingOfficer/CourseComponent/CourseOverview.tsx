import { FiUpload, FiEdit2, FiSearch, FiFilter } from "react-icons/fi";

const CourseOverview = () => {
  return (
    <section className="w-full h-auto">
      <div className="flex flex-row gap-5">
        <section className="w-1/2 h-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-h-h6 font-medium">0 Participants</h1>
            <div className="flex gap-2">
              <button className="p-2 bg-c-grey-5 rounded-md"><FiSearch size={20}/></button>
              <button className="p-2 bg-c-grey-5 rounded-md"><FiFilter size={20}/></button>
            </div>
          </div>
          <table className="w-full border">
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
        <section className="w-1/2 h-auto p-3 border border-c-grey-500 rounded-md">
          <div>
            <h1 className="text-h-h6 font-medium">Course Overview</h1>
          </div>
          <button className="w-full border-2 border-dashed p-20 flex flex-col items-center justify-center border-c-blue-50 rounded-md">
            <FiUpload size={44}/>
            <p className="font-medium">Upload Cover Image</p>
            <p className="text-c-grey-50">(Max. 20mb, Landscape)</p>
          </button>
          <div className="w-full py-4 flex items-center justify-between">
            <h1 className="text-h-h5 font-medium">Course Title</h1>
            <FiEdit2 size={20}/>
          </div>
          <div className="flex flex-col">
            <label className="text-c-grey-50">Course Description</label>
            <textarea placeholder="Input Course Description" className="h-24 border-2 rounded-md resize-none p-2"></textarea>
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Category / Department</label>
            <select className="border-2 rounded-md p-2"></select>
          </div>
          <div className="flex flex-col mt-5">
            <label className="text-c-grey-50">Visibility Option</label>
            <select className="border-2 rounded-md p-2"></select>
          </div>
        </section>
      </div>
    </section>
  )
}

export default CourseOverview