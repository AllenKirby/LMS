import { Outlet } from "react-router-dom";

const AuthPage = () => {
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
