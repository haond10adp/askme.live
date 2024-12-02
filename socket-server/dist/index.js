"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_https_1 = require("node:https");
const socket_io_1 = require("socket.io");
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const node_fs_1 = __importDefault(require("node:fs"));
const options = {
    key: node_fs_1.default.readFileSync('./../.cert/private.key'),
    cert: node_fs_1.default.readFileSync('./../.cert/certificate.crt'),
};
const app = (0, express_1.default)();
const httpServer = (0, node_https_1.createServer)(options, app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const uid = new short_unique_id_1.default({ length: 6 });
const rooms = [
    {
        id: uid.rnd(),
        title: 'testing',
        participants: [],
    },
];
const clearRoomInterval = 10000;
setInterval(() => {
    rooms.forEach((room) => {
        var _a;
        if (((_a = room.participants) === null || _a === void 0 ? void 0 : _a.length) == 0) {
            const index = rooms.indexOf(room);
            setTimeout(() => {
                if (room.title == 'testing')
                    return;
                rooms.splice(index, 1);
                io.emit('rooms', rooms);
            }, clearRoomInterval);
        }
    });
}, clearRoomInterval);
io.on('connection', (socket) => {
    // io.to(socket.id).emit('rooms', rooms);
    io.emit('rooms', rooms);
    socket.on('new-room', (room) => {
        room.id = uid.rnd();
        room.participants = [];
        rooms.push(room);
    });
    socket.on('join-room', (roomId, user) => {
        var _a;
        const participants = (_a = rooms.find((room) => roomId == room.id)) === null || _a === void 0 ? void 0 : _a.participants;
        if (participants === null || participants === void 0 ? void 0 : participants.some((participant) => participant.username == user.username)) {
            return;
        }
        socket.join(roomId);
        user.socketId = socket.id;
        participants === null || participants === void 0 ? void 0 : participants.push(user);
        io.emit('rooms', rooms);
    });
});
io.of('/').adapter.on('leave-room', (roomId, socketId) => {
    var _a;
    const participants = (_a = rooms.find((room) => roomId == room.id)) === null || _a === void 0 ? void 0 : _a.participants;
    const index = participants === null || participants === void 0 ? void 0 : participants.findIndex((participant) => participant.socketId == socketId);
    if (index > -1) {
        participants === null || participants === void 0 ? void 0 : participants.splice(index, 1);
        io.emit('rooms', rooms);
    }
});
httpServer.listen(3001, () => {
    console.log('listening on *:3001');
});
