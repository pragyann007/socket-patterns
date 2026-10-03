// context/SocketContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  // Add a state to force React to broadcast the initialized socket instance
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      const socketInst = io("http://localhost:3000", {
        autoConnect: true,
        transports: ["websocket"], // Forces instant connection
        withCredentials: true,
      });

      socketRef.current = socketInst;

      // When the server confirms connection, update state to broadcast globally
      socketInst.on("connect", () => {
        console.log("🟢 Socket connected successfully! ID:", socketInst.current?.id || socketInst.id);
        setSocketInstance(socketInst);
      });

      socketInst.on("disconnect", (reason) => {
        console.log("🔴 Socket disconnected because:", reason);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocketInstance(null);
      }
    };
  }, []);

  // Pass down the state instance instead of the raw ref
  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
