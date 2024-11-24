"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const app = (0, express_1.default)();
const httpServer = (0, node_http_1.createServer)(app);
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
io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('rooms', rooms);
    socket.on('new-room', (room) => {
        room.id = uid.rnd();
        rooms.push(room);
    });
    socket.on('join-room', (roomId, userName) => {
        var _a;
        const participants = (_a = rooms.find((room) => roomId == room.id)) === null || _a === void 0 ? void 0 : _a.participants;
        if (participants === null || participants === void 0 ? void 0 : participants.includes(userName))
            return;
        socket.join(roomId);
        participants === null || participants === void 0 ? void 0 : participants.push(userName);
        io.emit('rooms', rooms);
    });
    socket.on('leave-room', (roomId, userName) => {
        var _a;
        socket.leave(roomId);
        const participants = (_a = rooms.find((room) => roomId == room.id)) === null || _a === void 0 ? void 0 : _a.participants;
        const index = participants === null || participants === void 0 ? void 0 : participants.indexOf(userName);
        if (index) {
            participants === null || participants === void 0 ? void 0 : participants.splice(index, 1);
            io.emit('rooms', rooms);
        }
    });
});
httpServer.listen(3001, () => {
    console.log('listening on *:3000');
});
