import React from "react";
import Search from "./Search";
import Users from "./Users";
import UserGetAllUser from "../../context/UserGetAllUser";
import useConvo from "../../states/useConvo";
import { useAuth } from "../../context/AuthProvider.jsx";
import Loading from "../../component/Loading.jsx";

function Left() {
  const [alluser] = UserGetAllUser();
  const { authuser } = useAuth();
  const { selectedConvo } = useConvo();
  const upper = authuser?.user.name.charAt(0).toUpperCase();
  const lower = authuser?.user.name.slice(1).toLowerCase();
  const Name = upper + lower;
  const isSelected = selectedConvo ? "hidden" : "";

  const isLarge = window.innerWidth >= 1024;

  if (!isLarge && selectedConvo) return null;

  return (
    <div className={`w-full lg:w-[30%] text-white p-2 ${isSelected} lg:block`}>
      <h1 className="font-bold text-2xl sm:text-3xl font-sans p-2 pt-5">
        Relations
      </h1>
      <Search />
      {alluser.length === 0 ? (
        <div clsassName = "z-10 mb-96">
          <Loading/>
        </div>
      ) : (
        <Users />
      )}
    </div>
  );
}

export default Left;
