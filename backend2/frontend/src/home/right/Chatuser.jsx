import React from "react";
import useConvo from "../../states/useConvo.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useSocket } from "../../context/SocketContext.jsx";

function Chatuser() {
  const { selectedConvo, setSelectedConvo } = useConvo();
  const { online } = useSocket();
  const isOnline = online.some((u) => u.userId === selectedConvo?._id);

  const upper = selectedConvo?.name.charAt(0).toUpperCase();
  const lower = selectedConvo?.name.slice(1).toLowerCase();
  const Name = upper + lower;

  const handleBack = () => {
    setSelectedConvo(null);
  };

  const getGender = (gender) => {
    if(gender === "Male"){
      return "/male.png"
    }
    else if(gender === "Female"){
      return "/female.png"
    }
    else{
      return "/other.png"
    }
  }

  return (
    <div className="flex items-center p-3 bg-DarkGray shadow-md h-[8vh] sm:h-[10vh] justify-between">
      <div className="flex gap-4">
        <div className="avatar">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full">
            <img
              src={getGender(selectedConvo?.gender)}
              alt="user"
            />
          </div>
        </div>
        <div className="text-white">
          <h1 className="font-semibold text-base sm:text-lg">
            {Name || "User"}
          </h1>
          <p className="text-xs text-gray-400">{isOnline ? <span className="text-success"> Online </span>:"Offline"}</p>
        </div>
      </div>

      {/* back button on small screen */}
      <button
        className="btn btn-outline btn-info sm:hidden"
        onClick={handleBack}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default Chatuser;
