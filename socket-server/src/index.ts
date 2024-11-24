import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import ShortUniqueId from 'short-unique-id';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

interface Room {
  id: string;
  title: string;
  participants?: string[];
}

const uid = new ShortUniqueId({ length: 6 });
const rooms: Room[] = [
  {
    id: uid.rnd(),
    title: 'testing',
    participants: [],
  },
];

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('rooms', rooms);

  socket.on('new-room', (room) => {
    room.id = uid.rnd();
    rooms.push(room);
  });
  socket.on('join-room', (roomId, userName) => {
    const participants = rooms.find((room) => roomId == room.id)?.participants;
    if (participants?.includes(userName)) return;
    socket.join(roomId);
    participants?.push(userName);
    io.emit('rooms', rooms);
  });
  socket.on('leave-room', (roomId, userName) => {
    socket.leave(roomId);
    const participants = rooms.find((room) => roomId == room.id)?.participants;
    const index = participants?.indexOf(userName);
    if (index) {
      participants?.splice(index, 1);
      io.emit('rooms', rooms);
    }
  });
});

httpServer.listen(3001, () => {
  console.log('listening on *:3001');
});
