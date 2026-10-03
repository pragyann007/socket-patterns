
    export class ChatController{
        constructor(io){
            this.io = io ; 
        }

        async requestToJoinRoom(socket,roomId){
            const room = this.io.sockets.adapter.rooms.get(roomId);

            const numUsers = room? room.size : 0 ; 

            if(numUsers == 0 ){
                socket.join(roomId);
                console.log("user create the room",roomId)
                socket.emit("room_status",{status:"created",roomId});


            }

            else if(numUsers==1){
                socket.join(roomId);
                console.log("user joined the room",roomId)

                socket.emit("room_status",{status:"joined",roomId});
            }
            else{
                console.log("room size full",roomId);

                socket.emit("room_status",{status:"full",roomId});
            }
        }

        async handleClientReady(socket){
            console.log(`${socket.id} ready to handle the connection..`);
            socket.emit("ok",{message:"All ok."})
        }

        async handleUserMessage(socket,data){

            console.log("message for everyone ...",data);
            this.io.to(data.roomId).emit("all:message",{
                message:data.message,
                sender:data.sender
            })
            
        }

        async handleTypingState(socket,data){
            console.log("typoinggg..",data.typer)
            this.io.to(data.roomId).emit("typing",data);
        }
    }