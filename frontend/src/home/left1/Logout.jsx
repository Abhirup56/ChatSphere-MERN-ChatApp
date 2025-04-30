import React from "react";
import { useState } from "react";
import { IoPowerSharp } from "react-icons/io5";
import axios from "axios";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { LuMessageSquareText } from "react-icons/lu";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";


function Logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("messenger");
      Cookies.remove("token");
      window.location.reload();

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("Error in logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  const isLarge = window.innerWidth > 738;
  return (
    
    <div className="w-full lg:w-[4%] bg-csDblue flex flex-row sm:flex-col justify-between lg:items-center bg-LightGray h-auto sm:h-screen">
      <div className="lg:h-[90%]  sm:w-[90%] sm:pt-1 flex flex-row items-center">
        <ul className="menu lg:p-0 lg:h-60  menu-horizontal sm:menu-vertical sm:w-60 flex justify-between bg-DarkGray rounded-box ">
        <li>
          <Link to="/profile" className="tooltip text-info"><CgProfile size={20}/></Link>
        </li>
        <li>
        <Link to="/" className="tooltip text-info">
            <LuMessageSquareText size={20} />
          </Link>
        </li>
        <li>
          <Link to="/about" className="tooltip text-info">
            <IoMdInformationCircleOutline size={20} />
          </Link>
        </li>
      </ul>
      </div>
      <div className="lg:h-[10%] sm:w[10%]">
      <button
        className="btn btn-circle btn-outline btn-info m-1.5 cursor-pointer"
        onClick={handleLogout}
      >
        <IoPowerSharp size={20} />
      </button>
      </div>
      
      
    </div>
  );
}

export default Logout;
