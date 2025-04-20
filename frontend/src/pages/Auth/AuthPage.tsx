import { Outlet, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/UserRedux";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

const AuthPage = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true); // Loading state

  useEffect(() => {
    let isMounted = true;
    const user = cookies.get('user');
  
    const roleRedirect = (roleName: string) => {
      if (!isMounted) return;
      if (!roleName) return navigate('/');
      if (roleName === 'trainee') return navigate('/trainee/home');
      if (roleName === 'training_officer') return navigate('/trainingofficer/dashboard');
    };
  
    if (user && user.user?.role) {
      dispatch(setUser(user));
      roleRedirect(user.user.role);
    } else {
      setIsChecking(false);
    }
  
    return () => {
      isMounted = false;
    };
  }, []);

  if (isChecking) return <LoadingPage/>;

  return (
    <section className="w-full h-screen flex flex-row">
      <figure className="w-3/5 h-full bg-c-green-90 p-5">
        <section className="w-full h-auto flex gap-2">
          <div className="w-16 h-16 bg-white rounded-full"></div>
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
