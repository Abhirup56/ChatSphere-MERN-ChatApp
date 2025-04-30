import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; // ✅ Import useAuth
import toast, { Toaster } from 'react-hot-toast';
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setAuthUser } = useAuth(); // ✅ Use AuthContext
  const navigate = useNavigate(); // ✅ Use React Router navigation

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.pass,
      };

      const response = await axios.post("/api/user/login", userInfo);

      if (response.data) {
        toast.success("Login successful");
        localStorage.setItem("messenger", JSON.stringify(response.data)); // ✅ Store in localStorage
        setAuthUser(response.data); // ✅ Update Auth Context
        navigate("/"); // ✅ Redirect to Chat after login
      }
    } catch (error) {
      if (error.response?.status === 600) {
        console.error(
          "Login error:",
          error.response?.data?.message || error.message
        );
        toast.error(
          "Error: " + (error.response?.data?.message || "Invalid Password")
        );
      } else {
        console.error(
          "Login error:",
          error.response?.data?.message || error.message
        );
        toast.error(
          "Error: " + (error.response?.data?.error || "Something went wrong")
        );
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-LightGray p-4 w-screen">
        <h1 className="text-white text-2xl">Welcome Back (Login)</h1>
      </div>
      <div className="flex h-screen items-center justify-center flex-col relative bottom-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 px-8 py-4 rounded-lg bg-LightGray shadow-[0px_0px_15px_5px] shadow-Blue"
        >
          <h1 className="text-3xl text-Blue font-dance">ChatSphere</h1>
          <div className="space-y-4">
            <label className="input input-bordered input-primary flex items-center gap-2">
              <input
                type="email"
                className="grow input validator"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && (
              <span className="text-red-500 italic text-sm">
                ** This field is required **
              </span>
            )}

            <label className="input input-bordered flex input-primary items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="password"
                minLength="6"
                
                {...register("pass", { required: true })}
              />
              
            </label>
            {errors.pass && (
              <span className="text-red-500 italic text-sm">
                ** This field is required **
              </span>
            )}
          </div>

          <button className="btn btn-info text-White w-full py-2 rounded-md">
            Login
          </button>

          <hr />
          <p className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-500 underline">
              {" "}
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
