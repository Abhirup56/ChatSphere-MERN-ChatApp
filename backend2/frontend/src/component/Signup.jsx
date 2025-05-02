import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"; 
import toast from "react-hot-toast";

function Signup() {
  const { authuser, setAuthUser } = useAuth();  // ✅ Correct destructuring

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmPassword,
    };

    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        console.log("Success:", response.data);
        if (response.data) {
          toast.success("Sign Up successful");
        }
        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);  // ✅ Correct function call
      })
      .catch((error) => {
        console.error("Error:", error.response?.data?.message || error.message);
        toast.error("Error: " + error.response.data.error);
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-LightGray p-4 w-screen flex lg:justify-center">
        <h1 className="text-white text-2xl">Create an account</h1>
      </div>
      <div className="flex justify-center mt-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 px-8 py-4 rounded-lg bg-LightGray shadow-[0px_0px_15px_5px] shadow-Blue"
        >
          <h1 className="text-3xl text-Blue font-dance">ChatSphere</h1>

          {/* Username */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Username"
              {...register("name", { required: "Username is required" })}
            />
          </label>
          {errors.name && (
            <span className="text-red-500 italic text-sm">
              {errors.name.message}
            </span>
          )}

          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 italic text-sm">
              {errors.email.message}
            </span>
          )}

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 italic text-sm">
              {errors.password.message}
            </span>
          )}

          {/* Confirm Password */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-500 italic text-sm">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Submit Button */}
          <button className="btn btn-info text-White w-full py-2 rounded-md hover:shadow-lg hover:shadow-Blue transition-shadow duration-200">
            Create account
          </button>
          <hr />
          <p className="text-sm">
            Already have an account?
            <Link to="/login" className="text-Blue underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
