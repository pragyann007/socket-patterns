import { Server } from "socket.io";
import { registerChatRoutes } from "../socket/routes/chat.routes.js";


export const initSocket = (server,allowedOrigin)=>{
    const io = new Server(server,{
        cors:{
            origin:allowedOrigin,
            credentials:true
        }
    });

    // middlewares
    // io.use()

    io.on("connection",(socket)=>{

        console.log(`New socket joined with socketId: ${socket.id}`)


        registerChatRoutes(io,socket);

        socket.on("disconnect",()=>{
            console.log("socket disconnected..")
        })

    })

    return io ; 
}

