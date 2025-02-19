import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//icons
import { GoLock } from "react-icons/go";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoIosAt } from "react-icons/io";

import { Input, Button } from "../../Components/UIComponents";
import { useAuthHook } from "../../hooks";

// interface Login {
//   email: string;
//   password: string;
// }

const loginSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required!"),
  password: yup.string().min(8, "Password must be at least 8 character").required("Password is required"),
});

type LoginForm = yup.InferType<typeof loginSchema>;

const LoginPage: React.FC = () => {
  //router
  const navigate = useNavigate();
  //hooks
  const { handleLogin, isLoading } = useAuthHook();
  //states
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // const [loginCredentials, setLoginCredentials] = useState<Login>({
  //   email: "",
  //   password: "",
  // });

  // const login = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Login attempt...");

  //   await handleLogin(loginCredentials);
  // };

  const { 
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  })

  const login = async (data: LoginForm) => {
      console.log(data, "Login attempt...");
  
      await handleLogin(data);
    };
  return (
    <form onSubmit={handleSubmit(login)} className="w-3/4 h-fit text-f-dark">
      <section>
        <h1 className="text-h-h4 font-semibold -mb-2">Get Started</h1>
        <p className="text-p-rg text-c-grey-50 ">
          Ready to learn? Let's grow together and enhance our skills.
        </p>
      </section>
      <section className="flex flex-col gap-6 py-10">
        <div>
          <label>Email Address</label>
          <div className="relative w-auto h-auto mt-1">
            <IoIosAt
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
              size={27}
            />
            {/* <Input
              type="email"
              styling="secondary"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  email: e.target.value,
                })
              }
              placeholder="Enter your email address"
            /> */}
            <Input
              type="email"
              styling="secondary"
              {...register("email")}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && <p className="text-p-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label>Password</label>
          <div className="relative w-auto h-auto mt-1">
            <GoLock
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
              size={24}
            />
            {/* <Input
              type={showPassword ? "text" : "password"}
              styling="primary"
              onChange={(e) =>
                setLoginCredentials({
                  ...loginCredentials,
                  password: e.target.value,
                })
              }
              placeholder="Enter your password"
            /> */}
            <Input
               type={showPassword ? "text" : "password"}
              styling="secondary"
              {...register("password")}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                  size={24}
                />
              ) : (
                <FiEye
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-c-grey-50"
                  size={24}
                />
              )}
            </button>
          </div>
          <div className="flex justify-between items-center">
            {errors.password && <p className="text-p-sm text-red-500 mt-1">{errors.password.message}</p>}
            <p className="w-full text-end cursor-pointer text-c-green-70 font-medium mt-1">
              Forgot Password?
            </p>
          </div>
        </div>
      </section>
      <section>
        <Button type="submit" children="Sign In" disabled={isLoading || !isValid} />
        <p className="text-c-grey-50 w-full text-center mt-4">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-c-green-70 font-medium"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </section>
    </form>
  );
};

export default LoginPage;
