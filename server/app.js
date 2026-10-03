import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGIN = "http://localhost:5173";

// Sync Socket.IO CORS
const io = new Server(server, {
    cors: {
        origin: ALLOWED_ORIGIN,
        credentials: true
    }
});

app.use(express.json());

// Sync Express CORS to prevent cookie errors later
app.use(cors({
    origin: ALLOWED_ORIGIN,
    credentials: true
}));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "all okay"
    });
});

io.on("connection", (socket) => {
    console.log("Socket connected with ID:", socket.id);


    socket.on("client:ready",()=>{
        console.log("client ready")
        socket.emit("terobau", { message: "iloveu" });


    })
    // Send payload safely to the connecting client

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
