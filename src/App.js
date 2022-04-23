import Home from "./pages/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Chat from "./pages/Chat";
import Setting from "./pages/Setting";
import styled from "styled-components"

const Container = styled.div`
background-color:${props=> props.darkMode ? "#333" : "white"} ;
color:${props=> props.darkMode && "white"} ;
transition: all 1s ease;
`;

function App() {
  const { user, darkMode } = useContext(AuthContext);
  return (
    <Container darkMode={darkMode}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/setting" element={user ? <Setting /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
