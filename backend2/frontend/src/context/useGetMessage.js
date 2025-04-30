import React, { useEffect } from "react";
import { useState } from "react";
import useConvo from "../states/useConvo.jsx";
import axios from "axios";

function useGetMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConvo } = useConvo();

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      if (selectedConvo && selectedConvo._id) {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/message/get/${selectedConvo._id}`
          );
          setMessages(response.data.message);
        } catch (error) {
          console.error("Error in fetching useGetMessages:", error);
        } finally {
          setLoading(false);
        }
      }
      
      
    };
    getMessage();
  }, [selectedConvo, setMessages]);

  return {
    loading,
    messages,  // this makes naming consistent
  };
}

export default useGetMessage;
