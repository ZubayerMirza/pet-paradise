import { io } from "socket.io-client";
export const PORT = "http://localhost:8000/"

// working with same domain with the server
const socket = io(PORT);

export default socket;