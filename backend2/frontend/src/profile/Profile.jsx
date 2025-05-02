import React from "react";
import { useAuth } from "../context/AuthProvider";
import Logout from "../home/left1/Logout";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const { authuser } = useAuth();
  console.log(authuser);
  const email = authuser?.user.email;
  const upper = authuser?.user.name.charAt(0).toUpperCase();
  const lower = authuser?.user.name.slice(1).toLowerCase();
  const Name = upper + lower;

  const [gender, setGender] = useState("");
  const [dp, setDp] = useState("/other.jpg");

  useEffect(() => {
    if (authuser?.user?.gender) {
      setGender(authuser.user.gender);
      updateDp(authuser.user.gender);
    }
  }, [authuser]);
  const updateDp = (selectedGender) => {
    if (selectedGender === "Male") {
      setDp(`${import.meta.env.BASE_URL}male.png`);
    } else if (selectedGender === "Female") {
      setDp(`${import.meta.env.BASE_URL}female.png`);
    } else {
      setDp(`${import.meta.env.BASE_URL}other.png`);
    }
  };
  const handleGenderChange = async (e) => {
    const selected = e.target.value;
    setGender(selected);
    updateDp(selected);

    try {
      await axios.put(
        "/api/user/update",
        { gender: selected },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Gender update failed:", err.message);
    }
  };

  return (
    <>
      <div
        className="flex flex-col sm:flex-row bg-DarkGray h-screen"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Logout />
        <div className="flex flex-col sm:flex-row justify-center items-center relative top-9 sm:top-0 gap-10 sm:mx-20 sm:left-[25%]">
          <div className="avatar">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full ring ring-info ring-offset-base-100 ring-offset-2">
              <img src={dp} />
            </div>
          </div>

          <div className="w-full max-w-md">
            <fieldset className="fieldset border-2 border-info rounded-lg p-4 shadow bg-base-200 w-Max">
              <legend className="text-info font-semibold text-lg px-2">
                Profile Details
              </legend>

              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={Name}
              />

              <label className="label mt-2">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={email}
              />

              <label className="label mt-2">
                <span className="label-text">Gender</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={gender}
                onChange={handleGenderChange}
                defaultValue={"Other"}
              >
                <option value="" disabled>
                  Pick your gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
