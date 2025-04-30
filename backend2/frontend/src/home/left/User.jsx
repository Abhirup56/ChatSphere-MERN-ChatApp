import React from 'react';
import useConvo from '../../states/useConvo';
import { useSocket } from '../../context/SocketContext.jsx';

function User({ user }) {
  const { selectedConvo, setSelectedConvo } = useConvo();
  const isSelected = selectedConvo?._id === user._id;
  const upper = user.name.charAt(0).toUpperCase();
  const lower = user.name.slice(1).toLowerCase();
  const Name = upper + lower;
  const { online } = useSocket();
  const isOnline = online.some((u) => u.userId === user._id);

  return (
    <div
      className={`flex items-center space-x-3 p-2 cursor-pointer rounded-lg transition duration-200 ${
        isSelected ? 'bg-[#2C2C3E]' : 'bg-LightGray hover:bg-gray-700'
      }`}
      onClick={() => setSelectedConvo(user)}
    >
      <div className={`avatar ${isOnline ? 'online' : ''}`}>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-sm sm:text-base font-semibold">{Name}</h1>
        <span className="text-xs text-gray-400">{user.email}</span>
      </div>
    </div>
  );
}

export default User;
