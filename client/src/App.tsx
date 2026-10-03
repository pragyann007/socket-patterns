// App.tsx
import React, { useEffect } from 'react';
import { useSocket } from './context/SocketContext';

const App = () => {
  const socket = useSocket();

  // Log on every render to see the status change from null to an object
  console.log("Current Socket State in App:", socket);

  useEffect(() => {
    if (!socket) {
      console.log("⏸️ Socket is null, waiting...");
      return; 
    }
    
    console.log("⚡ Socket is active! Binding listeners now.");

    const handleTeroBau = (data: { message: string }) => {
      console.log("🎉 SUCCESS! Received from terobau:", data);
    };

    // Bind listener
    socket.on("terobau", handleTeroBau);

    // Let the server know we are ready to receive data
    socket.emit("client:ready");

    return () => {
      socket.off("terobau", handleTeroBau);
    };
  }, [socket]); // Triggers immediately when socket changes from null to object

  return (
    <div style={{ padding: '20px' }}>
      <h1>Socket.IO Testing Arena</h1>
      <p>Status: {socket ? "🟢 Active Connection" : "🔴 Waiting for context..."}</p>
      {socket && <p>Connected ID: {socket.id}</p>}
    </div>
  );
};

export default App;
