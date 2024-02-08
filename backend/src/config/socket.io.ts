/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "socket.io";

const io = new Server(Number(process.env.WS_PORT), { /* options */ });

io.on('connect', (socket: any) => {
  console.log(`⚡: ${socket.id} user just connected`);

  socket.on('notification', (data: any) => {
    console.log(data)
  })
  
  socket.on('disconnect', () => {
  });
})
