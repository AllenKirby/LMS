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
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: yup.string().required("Password is required"),
});

type LoginForm = yup.InferType<typeof loginSchema>;

const LoginPage: React.FC = () => {
  //router
  const navigate = useNavigate();
  //hooks
  const { handleLogin, isLoading } = useAuthHook();
  //states
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const { 
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const login = async (data: LoginForm) => {
    console.log(data, "Login attempt...");
    await handleLogin(data);
  };

  const handleButtonClick = async () => {
    const valid = await trigger();
    if (!valid) return;
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
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                errors.email ? "text-red-500" : "text-c-grey-50"
              }`}
              size={27}
            />
            <Input
              type="email"
              styling="secondary"
              {...register("email")}
              placeholder="Enter your email address"
              error={!!errors.email}
            />
          </div>
          {errors.email && (
            <p className="text-p-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label>Password</label>
          <div className="relative w-auto h-auto mt-1">
            <GoLock
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-c-grey-50 ${
                errors.password ? "text-red-500" : "text-c-grey-50"
              }`}
              size={24}
            />
            <Input
              type={showPassword ? "text" : "password"}
              styling="secondary"
              {...register("password")}
              placeholder="Enter your password"
              error={!!errors.password}
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
            {errors.password && (
              <p className="text-p-sm text-red-500 mt-1 text-nowrap">
                {errors.password.message}
              </p>
            )}
            <p className="w-full text-end cursor-pointer text-c-green-70 font-medium mt-1">
              Forgot Password?
            </p>
          </div>
        </div>
      </section>
      <section>
        <Button
          type="submit"
          onClick={handleButtonClick}
          children="Sign In"
          disabled={isLoading}
        />
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
