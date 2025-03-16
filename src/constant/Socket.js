import { io } from "socket.io-client";

// Replace with your backend URL
const SOCKET_SERVER_URL = "http://localhost:2000";

const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"], // Ensures a stable connection
});

export default socket;
