import React from "react";
import Chatuser from "./Chatuser";
import Message from "./Message";
import Type from "./Type";
import useConvo from "../../states/useConvo";
import { useAuth } from "../../context/AuthProvider.jsx";

function Right() {
  const { selectedConvo } = useConvo();
  const { authuser } = useAuth();
  const upper = authuser?.user.name.charAt(0).toUpperCase();
  const lower = authuser?.user.name.slice(1).toLowerCase();
  const Name = upper + lower;
  const isSelected = selectedConvo ? "" : "hidden";

  const isLarge = window.innerWidth >= 1024;

  if (!isLarge && !selectedConvo) return null;

  return (
    <div className="flex flex-col w-full lg:w-[70%] bg-LightGray rounded-lg overflow-hidden">
      {selectedConvo ? (
        <>
          <Chatuser />
          <Message />
          <Type />
        </>
      ) : (
        <div className={`flex flex-col justify-center items-center h-[92vh] ${isSelected}  lg:block`}>
          <div className="text-center p-6 bg-DarkGray rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome{" "}
              <span
                className="text-info"
                style={{ textShadow: "0px 0px 5px #009de4" }}
              >
                {Name}
              </span>
            </h2>
            <p className="text-gray-400">Select a user to chat</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Right;
