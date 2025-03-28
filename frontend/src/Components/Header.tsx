import { NavLink, useLocation } from "react-router-dom";
//icons
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
//hooks
import { useAuthHook } from "../hooks";
import { useSelector } from "react-redux";

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

const Header: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>(location.pathname);
  //states
  const [dropDown, setDropDown] = useState<boolean>(false);
  //hooks
  const { handleLogout, isLoading } = useAuthHook();
  //redux
  const user = useSelector((state: { user: UserState }) => state.user);

  const logout = async () => {
    await handleLogout();
  };

  console.log(location.pathname);

  return (
    <header className="w-full h-auto py-4 px-14 flex items-center justify-between border-b">
      <section className="flex items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <h1 className="text-p-lg font-medium">NIA-LMS</h1>
      </section>
      <nav className="p-3">
        <ul className="flex flex-row">
          {user.user.role === "trainee" && (
            <NavLink to={"home"} className={({ isActive }) =>
              `hover:bg-c-green-5 hover:text-c-green-70 px-3 rounded-full ${isActive ? "text-c-green-50 font-semibold" : "text-f-dark font-medium"}`
            }>
              Home
            </NavLink>
          )}
          {user.user.role === "trainee" && (
            <NavLink to={"mycourses"} className={({ isActive }) =>
            `hover:bg-c-green-5 hover:text-c-green-70 px-3 rounded-full ${isActive ? "text-c-green-50 font-semibold" : "text-f-dark font-medium"}`
          }>
              Course Library
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"dashboard"} className={({ isActive }) =>
            `hover:bg-c-green-5 hover:text-c-green-70 px-3 rounded-full ${isActive ? "text-c-green-50 font-semibold" : "text-f-dark font-medium"}`
          }>
              Home
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"courses/course"} className={({ isActive }) =>
            `hover:bg-c-green-5 hover:text-c-green-70 px-3 rounded-full ${isActive ? "text-c-green-50 font-semibold" : "text-f-dark font-medium"}`
          }>
              My Courses
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"trainee"} className={({ isActive }) =>
            `hover:bg-c-green-5 hover:text-c-green-70 px-3 rounded-full ${isActive ? "text-c-green-50 font-semibold" : "text-f-dark font-medium"}`
          }>
              Trainee
            </NavLink> 
          )}
          <NavLink to={"resources"} className={({ isActive }) =>
            `hover:bg-c-green-5 hover:text-c-green-70 px-3 rounded-full ${isActive ? "text-c-green-50 font-semibold" : "text-f-dark font-medium"}`
          }>
            Resources
          </NavLink>
        </ul>
      </nav>
      <div className="flex items-center justify-center gap-2">
        <section className="flex gap-2">
          <button className="rounded-full w-8 h-8 bg-gray-50 flex items-center justify-center">
            <CiSettings size={24} />
          </button>
          <button className="rounded-full w-8 h-8 bg-gray-50 flex items-center justify-center">
            <IoIosNotificationsOutline size={24} />
          </button>
        </section>
        <section className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-950"></div>
          <h2>{user.user.first_name}</h2>
          <div className="relative">
            <button onClick={() => setDropDown(!dropDown)}>
              <IoIosArrowDown size={16} />
            </button>
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
      </div>
    </header>
  );
};

export default Header;
