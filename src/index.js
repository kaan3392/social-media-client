import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContext, socket } from "./context/SocketContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </SocketContext.Provider>
  </React.StrictMode>
);
