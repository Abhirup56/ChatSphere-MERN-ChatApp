import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../context/useSendMessage";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

function Type() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { loading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <>
      <form onClick={handleSubmit}>
        <div className="flex pb-10 sm:pb-3 items-center gap-2 p-3 w-full bg-DarkGray ">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="btn btn-info text-white"
          >
            <FaSmile size={24} />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400"
          />
          <button className="btn btn-info text-white" disabled={loading}>
            <BsSend />
          </button>
        </div>
      </form>

      {showEmojiPicker && (
        <div className="absolute bottom-[100px] left-2 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
        </div>
      )}
    </>
  );
}

export default Type;
