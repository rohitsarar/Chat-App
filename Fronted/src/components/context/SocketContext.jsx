

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: { userId: authUser._id },
      });

      setSocket(socket);

      // Listen for online users list from server
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
        console.log("Updated online users:", users);
      });

      // Cleanup socket connection on unmount or authUser change
      return () => {
        socket.close();
        // setSocket(null);
      };
    } else {
    
    if (socket) {
      socket.close();
      setSocket(null);
    }
  }
  }, [authUser]); // Dependency on `authUser`

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};



