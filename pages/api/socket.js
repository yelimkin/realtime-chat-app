import { Server } from 'socket.io';

let io;

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('send-message', (data) => {
        socket.broadcast.emit('receive-message', data);
      });
    });
  }
  res.end();
}
