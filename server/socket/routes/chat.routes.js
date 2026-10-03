import { ChatController } from "../controllers/chat.controller.js"

export const  registerChatRoutes = (io,socket)=>{

    const chatController = new ChatController(io);

    socket.on("client:ready",()=>chatController.handleClientReady(socket));
    socket.on("requestToJoinRoom",(data)=>chatController.requestToJoinRoom(socket,data))

    socket.on("message",(data)=>chatController.handleUserMessage(socket,data));
    socket.on("user:typing",(data)=>chatController.handleTypingState(socket,data))
}