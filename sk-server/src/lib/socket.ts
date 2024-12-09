export const backendLink = 'https://askmelive.site:3001';
// export const backendLink = 'https://localhost:3001';
import { io } from 'socket.io-client';
export const socket = io(backendLink);
