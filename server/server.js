import http from "http";
import { ALLOWED_ORIGIN, app } from "./app.js";
import { initSocket } from "./config/socket.config.js";

const server  = http.createServer(app);
const port = 3000;


initSocket(server,ALLOWED_ORIGIN);

server.listen(port,()=>{
    console.log("server running at port 3000")
})
