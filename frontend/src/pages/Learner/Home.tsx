import { FiSearch, FiFilter } from "react-icons/fi";
import { CourseCard, Calendar } from '../../Components'
import { useSelector } from "react-redux";

interface UserInfo {
    id: number;
    email: string;
    role: string
}

interface UserState {
    message: string;
    user: UserInfo
}

interface RootState {
    user: UserState | null
}

const Home: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    console.log(user)
  return (
    <section className="w-full h-full py-7 px-5 flex flex-row gap-5 bg-gray-50">
        <section className="w-2/3 h-full overflow-y-auto flex flex-col px-5">
            <section>
                <p className="text-p-sm font-medium text-f-gray">Good Evening</p>
                <h2 className="text-h-h5 font-medium text-f-black">Welcome back, Dinnielle!</h2>
                <section className="flex flex-row space-x-4 ">
                    <div className="w-[230px] h-[120px] shadow-md rounded-md p-5 bg-white" >
                        <p className="text-p-sm font-medium text-f-gray mb-2">Course Enrolled</p>   
                        <div className="w-12 h-12 rounded-xl bg-gray-300 px-5"></div>
                    </div>
                    <div className="w-[230px] h-[120px] shadow-md rounded-md p-5 bg-white" >
                        <p className="text-p-sm font-medium text-f-gray mb-2">Course Completed</p>
                        <div className="w-12 h-12 rounded-xl bg-gray-300 p-5"></div>
                    </div>
                    <div className="w-[230px] h-[120px] shadow-md rounded-md p-5 bg-white" >
                        <p className="text-p-sm font-medium text-f-gray  mb-2">Activities Completed</p>
                        <div className="w-12 h-12 rounded-xl bg-gray-300 p-5"></div>
                    </div>
                    <div className="w-[230px] h-[120px] shadow-md rounded-md p-5 bg-white" >
                        <p className="text-p-sm font-medium text-f-gray  mb-2">Course Due</p>
                        <div className="w-12 h-12 rounded-xl bg-gray-300 p-5"></div>
                    </div>
                </section>
            </section>
            <section className="flex flex-col mt-14">
                <p className="text-h-h6 font-medium text-f-black mb-2">Course Overview</p>   
                <nav className="-p-3 px-2">
                    <ul className="flex gap-8 border-b border-gray-200 py-1 px-2">
                        <li className="text-f-gray">All</li>
                        <li className="text-f-gray">In progress</li>
                        <li className="text-f-gray">Completed</li>
                        <li className="text-f-gray">Saved</li>
                        <li className="text-f-gray">In progress</li>
                    </ul>
                </nav>
                <div className="flex flex-row items-center justify-between pt-3">
                    <div className="flex items-center justify-start gap-2">
                        <section className="flex flex-col w-50">   
                            <div className="relative">
                                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-f-gray" size={20}/>
                                <input type="search" className="w-[250px] p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white-50 outline-none focus:border-primary dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Search Course" />
                            </div>
                        </section>
                        <button className="text-f-gray px-5 py-1.5 bg-white-500 bg-white shadow-md rounded-lg flex items-center justify-center gap-3">
                            <FiFilter size={20}/>Filter
                        </button>
                    </div>
                    <div>
                        <a className="text-blue-500 text-sm">See all my courses</a>
                    </div>
                </div>
                <div className="w-full h-auto">
                    <CourseCard />
                </div>
            </section>
        </section>
        <section className="w-1/3 h-full pr-5">
            <div className="w-full h-full rounded-md shadow-lg bg-white p-3 flex flex-col">
                <Calendar/>
                <div className="w-full flex-1 overflow-y-auto">
                    <CourseCard/>
                </div>
            </div>
        </section>
    </section>
  )
}

export default Home