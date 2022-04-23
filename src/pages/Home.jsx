import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Feed from "../components/Feed";
import Hamburger from "../components/Hamburger";
import RightBar from "../components/RightBar";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";

const Container = styled.div`
  display: flex;
  width: 100%;
  overflow:hidden;
`;

const Home = () => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const userInfo = {
      userId : user._id,
      username: user.username
  };
  

  useEffect(() => {
    socket.emit("addUser", userInfo);

    socket.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
      console.log("onlineusers", users);
    });
  }, [user, socket]); 

  return (
    <>
      <Topbar />
      <Hamburger/>
      <Container>
        <Sidebar />
        <Feed home />
        <RightBar home onlineUsers={onlineUsers} />
      </Container>
    </>
  );
};

export default Home;
