import { NavLink } from "react-router-dom";
//icons
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
//hooks
import { useAuthHook } from '../hooks'

const Header: React.FC = () => {
    const [dropDown, setDropDown] = useState<boolean>(false)
    const { handleLogout, isLoading } = useAuthHook()

    const logout = async() => {
        await handleLogout()
    }

  return (
    <header className="w-full h-auto py-4 px-14 flex items-center justify-between border-b">
        <div className="flex gap-14">
            <section className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <h1 className="text-p-lg font-medium">NIA-LMS</h1>
            </section>
            <nav className="p-3">
                <ul className="flex gap-8">
                    <NavLink to={'home'} className="text-f-gray">Home</NavLink>
                    <NavLink to={'mycourses'} className="text-f-gray">My Courses</NavLink>
                    <NavLink to={'resources'} className="text-f-gray">Resources</NavLink>
                </ul>
            </nav>
        </div>
        <div className="flex items-center justify-center gap-2">
            <section className="flex gap-2">
                <button className="rounded-full w-8 h-8 bg-gray-50 flex items-center justify-center">
                    <CiSettings size={24}/>
                </button>
                <button className="rounded-full w-8 h-8 bg-gray-50 flex items-center justify-center">
                    <IoIosNotificationsOutline size={24}/>
                </button>
            </section>
            <section className="flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-950">

                </div>
                <h2>Allen Kirby</h2>
                <div className="relative">
                    <button onClick={() => setDropDown(!dropDown)}>
                        <IoIosArrowDown size={16}/>
                    </button>
                    {dropDown && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setDropDown(!dropDown)}/>
                            <div className="absolute right-0 bg-white rounded-md p-2 z-20">
                                <button className="px-3 py-1 rounded-md hover:bg-gray-100">Profile</button>
                                <button onClick={logout} className="px-3 py-1 rounded-md hover:bg-gray-100" disabled={isLoading}>Logout</button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    </header>
  )
}

export default Header