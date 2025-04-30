import { useSocket } from './SocketContext.jsx';
import useConvo from '../states/useConvo.jsx';
import { useEffect } from 'react';
import sound from '../assets/notify.mp3';

function useGetSocket() {
  const { socket } = useSocket();
  const { setMessages, selectedConvo } = useConvo();

  useEffect(() => {
    if (socket) {
      socket.on("NewMessage", (msg) => {
        const notify = new Audio(sound);
        notify.play();
  
        // Only update if the message is from the current selected conversation
        if (msg.senderId === selectedConvo?._id) {
          setMessages((prev) => [...prev, msg]); // ✅ Corrected variable name
        }
      });
    }
  
    return () => {
      if (socket) {
        socket.off("NewMessage");
      }
    };
  }, [socket, selectedConvo, setMessages]);
  

  return null;
}

export default useGetSocket;
