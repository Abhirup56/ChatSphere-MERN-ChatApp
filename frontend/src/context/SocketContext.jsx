import React from "react";
import { useAuth } from "./AuthProvider.jsx";
import { io } from "socket.io-client";
import { useEffect, useState, createContext, useContext  } from "react";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const[online, setOnline] = useState([]);
  const [socket, setSocket] = useState(null);
  const {authuser} = useAuth();

  useEffect(() => {
    if (authuser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authuser.user._id,
        },
      });
      setSocket(socket);
      socket.on("Online", (users) => {
        setOnline(users);
        console.log("Connected to server", socket.id);
      });
      return () => socket.close();
    }else{
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authuser]);
  return(
    <SocketContext.Provider value={{socket, online}}>
      {children}
    </SocketContext.Provider>
  )
};
