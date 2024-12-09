import express from 'express';
import cors from 'cors';
import { createServer } from 'node:https';
import { Server } from 'socket.io';
import ShortUniqueId from 'short-unique-id';
import fs from 'node:fs';

const options = {
  key: fs.readFileSync('./../.cert/private.pem'),
  cert: fs.readFileSync('./../.cert/certificate.pem'),
  ca: fs.readFileSync('./../.cert/rootca.pem'),
};

const app = express();
const httpsServer = createServer(options, app);
const io = new Server(httpsServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

export interface Room {
  id: string;
  title: string;
  participants?: Participant[];
}

interface Participant {
  socketId: string;
  nickname: string;
  username: string;
  topicCount: number;
}

const uid = new ShortUniqueId({ length: 6 });
const rooms: Room[] = [
  {
    id: uid.rnd(),
    title: 'testing',
    participants: [],
  },
];

const clearRoomInterval = 20000;

setInterval(() => {
  rooms.forEach((room) => {
    if (room.participants?.length == 0) {
      const index = rooms.indexOf(room);
      setTimeout(() => {
        if (room.title == 'testing') return;
        rooms.splice(index, 1);
        io.emit('rooms', rooms);
      }, clearRoomInterval);
    }
  });
}, clearRoomInterval);

io.on('connection', (socket) => {
  io.to(socket.id).emit('rooms', rooms);

  socket.on('new-room', (room: Room) => {
    room.id = uid.rnd();
    room.participants = [];
    rooms.push(room);
  });
  socket.on('join-room', (roomId: string, user: Participant) => {
    const participants = rooms.find((room) => roomId == room.id)?.participants;
    if (
      participants?.some((participant) => participant.username == user.username)
    ) {
      return;
    }
    socket.join(roomId);
    user.socketId = socket.id;
    participants?.push(user);
    io.emit('rooms', rooms);
  });

  socket.on('leave-room', (roomId, socketId) => {
    const participants = rooms.find((room) => roomId == room.id)?.participants!;
    const index = participants?.findIndex(
      (participant) => participant.socketId == socketId
    );
    if (index > -1) {
      participants?.splice(index, 1);
      io.emit('rooms', rooms);
    }
  });
});

io.on('leave-room', (roomId, socketId) => {
  const participants = rooms.find((room) => roomId == room.id)?.participants!;
  const index = participants?.findIndex(
    (participant) => participant.socketId == socketId
  );
  if (index > -1) {
    participants?.splice(index, 1);
    io.emit('rooms', rooms);
  }
});

httpsServer.listen(3001, () => {
  console.log('listening on *:3001');
});
