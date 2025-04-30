import { useState } from "react";
import axios from "axios";
import useConvo from "../states/useConvo.jsx";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConvo } = useConvo();

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(`/api/message/send/${selectedConvo._id}`, { message });
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error("Error in sendMessage:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessage;
