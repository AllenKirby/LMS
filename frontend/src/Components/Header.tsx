import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

//icons
import { IoIosArrowDown } from "react-icons/io";
import { RiNotification2Line } from "react-icons/ri";

//hooks
import { useAuthHook } from "../hooks";
import { useSelector } from "react-redux";
//Style
import { NavStyle } from "../assets/Util/ButtonStyle";

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
  //const [activeSection, setActiveSection] = useState<string>(location.pathname);
  //states
  const [dropDown, setDropDown] = useState<boolean>(false);
  //hooks
  const { handleLogout, isLoading } = useAuthHook();
  //redux
  const user = useSelector((state: { user: UserState }) => state.user);
  //Style
  const { default: NavDefault, inactive: NavInactive, active: NavActive } = NavStyle;

  const logout = async () => {
    await handleLogout();
  };

  console.log(location.pathname);

  return (
    <header className="w-full h-auto py-4 px-4 md:px-14 flex items-center justify-between border-b">
      <section className="flex items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <h1 className="text-p-lg font-medium">NIA-LMS</h1>
      </section>
      <nav className="p-3 hidden md:block">
        <ul className="flex flex-row">
          {user.user.role === "trainee" && (
            <NavLink to={"home"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
            }>
              Home
            </NavLink>
          )}
          {user.user.role === "trainee" && (
            <NavLink to={"mycourses"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
              Course Library
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"dashboard"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
              Home
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"courses/course"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
              My Courses
            </NavLink>
          )}
          {user.user.role === "training_officer" && (
            <NavLink to={"trainee"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
              Trainee
            </NavLink> 
          )}
          <NavLink to={"resources"} className={({ isActive }) =>
              `${NavDefault} ${isActive ? NavInactive : NavActive}`
          }>
            Resources
          </NavLink>
        </ul>
      </nav>
      <div className="flex items-center justify-center gap-2">
        <button className="rounded-full w-8 h-8 bg-gray-50 flex items-center justify-center">
          <RiNotification2Line size={28} />
        </button>
        <section className="hidden md:flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-950"></div>
          <h2 className="hidden md:block">{user.user.first_name}</h2>
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
      </div>
    </header>
  );
};

export default Header;
