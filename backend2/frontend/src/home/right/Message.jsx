import React, { useEffect, useRef } from "react";
import useGetMessage from "../../context/useGetMessage.js";
import Msg from "./Msg";

// Adjust the import path as necessary

function Message() {
  const { loading, messages } = useGetMessage();
  const lastmsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastmsgRef.current) {
        lastmsgRef.current.scrollIntoView({ 
          behavior: "auto",
          inline: "end",
         });
      }
    },20);
  }, [messages]);

  return (
    <>
      <div
      className="flex flex-col gap-2 p-3 overflow-y-auto"
      style={{
       height: "calc(92vh - 10vh)",
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      }}
      >
        {loading
          ? " "
          : messages.length > 0 &&
            messages.map((message) => (
              <div key={message._id} ref={lastmsgRef}>
                <Msg message={message} />
              </div>
            ))
        }
        <div className="flex flex-col items-center text-white">
          {!loading && messages.length === 0 && (
            <div className="border-2 border-blue-500 rounded-lg p-4 text-center w-fit bg-opacity-40 bg-gray-700">
              <p>No messages yet</p>
              <p>Start a conversation now!</p>
              <div className="flex justify-center items-center mt-2">
              <h1 className="font-chewy text-lg">Say Hi!</h1>
              <span className="text-4xl">👋</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Message;
