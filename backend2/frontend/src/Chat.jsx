import React from "react";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left1/Logout";
import useConvo from "./states/useConvo";
import useGetSocket from "./context/useGetSocket"; // ✅ Add this line
import Profile from "./profile/Profile";

function Chat() {
  const { selectedConvo } = useConvo();
  const isLarge = window.innerWidth >= 738;

  useGetSocket(); // ✅ Call the hook here to start listening for incoming messages

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-DarkGray">
      {isLarge ? (
        <>
          <Logout />
          {/*<Profile/>*/}
          <Left />
          <Right />
        </>
      ) : selectedConvo ? (
        <>
          <Right />
        </>
      ) : (
        <>
          <Logout />
          <Left />
        </>
      )}
    </div>
  );
}

export default Chat;
