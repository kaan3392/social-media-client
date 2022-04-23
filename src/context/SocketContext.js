import { createContext } from "react";
import {io} from "socket.io-client"

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:8800"
    : "wss://social-media-knlcl.herokuapp.com";

export const socket = io(BASE_URL, { transports: ['websocket'] });
export const SocketContext = createContext();