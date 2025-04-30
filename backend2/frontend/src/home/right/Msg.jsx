import React from 'react';

function Msg({ message }) {
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  const isMe = message.senderId === authUser.user._id;
  const chatName = isMe ? "chat-end" : "chat-start";
  const chatBubble = isMe ? "chat-bubble-primary" : "chat-bubble-secondary";
  const createdAt = new Date(message.createdAt).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      <div className={`chat ${chatName} flex flex-col`}>
        <div className={`chat-bubble ${ chatBubble } text-white max-w-xs sm:max-w-md text-sm sm:text-lg`}>
          {message.message}
        </div>
        <div className='text-xs'>{createdAt}</div>
      </div>
    </div>
  );
}

export default Msg;
