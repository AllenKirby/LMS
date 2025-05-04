import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import LoadingPage from "./LoadingPage";
import { handleAuthNavigation, getAuthCookie } from "../../utils/AuthUtils";
import NIALOGO from "../../assets/NIAimg.png";
import NIABG from "../../assets/NIABG.jpg";

import { useDispatch } from "react-redux";
import { setUser } from "../../redux/UserRedux";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const user = getAuthCookie();
  
    if (user?.user?.role) {
      dispatch(setUser(user));
      handleAuthNavigation(user.user.role, navigate);
    } else {
      setIsChecking(false);
    }
  }, [dispatch, navigate]);

  if (isChecking) return <LoadingPage/>;

  return (
    <section className="w-full h-screen flex flex-row">
      <figure
        className="relative w-3/5 h-full bg-c-green-90 p-5 z-10"
        style={{
          backgroundImage: `url(${NIABG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 z-20"></div>

        <section className="w-full h-auto flex gap-2 z-50 relative">
          <img
            src={NIALOGO}
            alt="NIA Logo"
            className="w-16 h-16 bg-white rounded-full"
          />
          <div className="flex items-center justify-start">
            <div className="text-f-light">
              <h1 className="text-h-h5">Learning Management System</h1>
              <h4 className="text-p-sm">
                National Irrigation Administration Region - 4A
              </h4>
            </div>
          </div>
        </section>
      </figure>
      <div className="w-2/5 h-full flex flex-col items-center justify-center bg-[#fafafa]">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthPage;