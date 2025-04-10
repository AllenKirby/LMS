import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavStyle } from "../assets/Util/ButtonStyle";
import { GoHome } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";
import { FiUsers, FiInbox } from "react-icons/fi";

import { useAuthHook } from "../hooks";

interface User {
    id: number;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    sex: string;
    birth_date: string;
    contact: string;
    address: string;
  }
  
interface UserState {
    message: string;
    user: User;
    access_token?: string;
    csrf_token?: string;
  }

const NavButton = () => {
    const user = useSelector((state: { user: UserState }) => state.user);
    const { default: NavDefault, inactive: NavInactive, active: NavActive } = NavStyle;
    const [dropDown, setDropDown] = useState<boolean>(false);
    const { handleLogout, isLoading } = useAuthHook();

    const logout = async () => {
        await handleLogout();
    };
    

  return (
    <nav className="w-full">
        <ul className="flex flex-row justify-between px-3">
          {user.user.role === "trainee" && (
            <NavLink to={"home"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
            }>
              <p className="hidden md:block">Home</p><GoHome size={32}/><p className="flex flex-col items-center text-p-sm"><GoHome size={32}/><span>Home</span></p>
            </NavLink>
          )}
          {user.user.role === "trainee" && (
            <NavLink to={"mycourses"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
              <p className="hidden md:block">Course Library</p><p className="flex flex-col items-center text-p-sm"><LiaBookSolid size={32}/><span>Course Library</span></p>
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"dashboard"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
              <p className="hidden md:block">Home</p><p className="flex flex-col items-center text-p-sm"><GoHome size={32}/><span>Home</span></p>
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"courses/course"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
              <p className="hidden md:block">My Courses</p><p className="flex flex-col items-center text-p-sm"><LiaBookSolid size={32}/><span>My Courses</span></p>
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"trainee"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
              <p className="hidden md:block">Trainee</p><p className="flex flex-col items-center text-p-sm"><FiUsers size={32}/><span>Trainee</span></p>
            </NavLink> 
          )}
          <NavLink to={"resources"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
            <p className="hidden md:block">Resources</p><p className="flex flex-col items-center text-p-sm"><FiInbox size={32}/><span>Resources</span></p>
          </NavLink>
           <section className="flex items-center justify-center">
                <img alt="Profile IMG" className="w-12 h-12 rounded-full bg-c-green-20" onClick={() => setDropDown(!dropDown)}></img>
                <div className="relative">
                    {dropDown && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setDropDown(!dropDown)}
                        />
                        <div className="absolute right-0 bg-white rounded-md p-2 z-20">
                        <button className="px-3 py-1 rounded-md hover:bg-gray-100">
                            Profile
                        </button>
                        <button className="px-3 py-1 rounded-md hover:bg-gray-100">
                            Settings
                        </button>
                        <button
                            onClick={logout}
                            className="px-3 py-1 rounded-md hover:bg-gray-100"
                            disabled={isLoading}
                        >
                            Logout
                        </button>
                        </div>
                    </>
                    )}
                </div>
            </section>
        </ul>
      </nav>
  )
}

export default NavButton