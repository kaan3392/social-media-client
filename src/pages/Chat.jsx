import styled from "styled-components";
import Topbar from "../components/Topbar";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import Hamburger from "../components/Hamburger";
import ChatOnline from "../components/ChatOnline";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { publicRequest } from "../requestMethods";
import { SocketContext } from "../context/SocketContext";
import FilteredUsers from "../components/FilteredUsers";

const color = "#383e42";

const Container = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  @media only screen and (max-width: 395px) {
    height: calc(100vh - 40px);
  }
`;
const Menu = styled.div`
  flex: 4;
  @media only screen and (max-width: 395px) {
    flex: 2;
  }
`;
const Input = styled.input`
  width: 90%;
  position: relative;
  padding: 10px 0px;
  border: none;
  font-size: 15px;
  padding-left: 5px;
  border-bottom: 1px solid gray;
  background-color: ${(props) => props.darkMode && "#333"};
  color: ${(props) => props.darkMode && "white"};
  transition: all 1s ease;
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 395px) {
    width: 70%;
    font-size: 14px;
    padding-left: 0;
  }
`;
const Box = styled.div`
  flex: 10;
  background-color: #80808014;
`;
const Top = styled.div`
  height: 85%;
  margin-top: 10px;
  overflow-y: scroll;
`;
const Bottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TextArea = styled.textarea`
  width: 80%;
  height: 90px;
  font-size: 18px;
  color: ${(props) => props.darkMode && "white"};
  background-color: ${(props) => props.darkMode && "#333"};
  &::placeholder {
    padding: 5px;
    color: ${(props) => props.darkMode && "white"};
  }
  &:focus {
    outline-color: ${color};
  }
  @media only screen and (max-width: 395px) {
    font-size: 14px;
    height: 80px;
    width: 70%;
  }
`;
const Send = styled.button`
  background-color: ${color};
  color: white;
  padding: 8px 13px;
  border: 1px solid ${color};
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: white;
    color: ${color};
  }
  @media only screen and (max-width: 395px) {
    padding: 5px 10px;
  }
`;
const Online = styled.div`
  flex: 3;
  margin-top: 10px;
  @media only screen and (max-width: 395px) {
    flex: 1;
  }
`;
const Wrapper = styled.div`
  padding: 0px 15px;
  height: 100%;
  display: ${(props) => props.box && "flex"};
  flex-direction: ${(props) => props.box && "column"};
  position: relative;
  @media only screen and (max-width: 395px) {
    padding: 0px 5px;
  }
`;
const Start = styled.span`
  position: absolute;
  font-size: 50px;
  font-weight: 400;
  text-align: center;
  top: 30%;
  cursor: default;
  @media only screen and (max-width: 395px) {
    font-size: 25px;
  }
`;
const ChooseConv = styled.div``;
const MessageCon = styled.div``;
const FilterContainer = styled.div`
  position: absolute;
  background-color: ${color};
  width: 200px;
  border-radius: 0px 0px 5px 5px;
  @media only screen and (max-width: 768px) {
    width: 150px;
  }
  @media only screen and (max-width: 395px) {
    width: 110px;
  }
`;
const Chat = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [text, setText] = useState("");
  const [filUsers, setFilUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user, darkMode } = useContext(AuthContext);
  const messageRef = useRef();
  const socket = useContext(SocketContext);

  //get message from socket
  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.newMessage,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  // add message to current chat
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //find online friends
  useEffect(() => {
    socket.emit("addUser", user._id);

    socket.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
      console.log("online", users);
    });
  }, [user, socket]);

  //get convs of a user
  useEffect(() => {
    const getConvs = async () => {
      const res = await publicRequest.get("/conversations/" + user._id);
      setConversation(res.data);
    };
    getConvs();
  }, [user]);

  //get messages of current chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await publicRequest.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  //find receiverId //send message to socket.io //send messages to db
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    //find receiverId
    const receiverId = currentChat.members.find((m) => m !== user._id);

    //send message to socket.io
    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      newMessage,
    });

    //send messages to db
    try {
      const res = await publicRequest.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  // scroll to down of the page
  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const filterUsers = async () => {
      const res = await publicRequest.get(`/users/searchuser?filter=${text}`);
      const response = res.data.filter((f) => f._id !== user._id);
      setFilUsers(response);
    };
    if (text.length !== 0) {
      filterUsers();
    }
  }, [text, user._id]);

  const handleClick = async (friend) => {
    const users = {
      senderId: user._id,
      receiverId: friend._id,
    };
    try {
      const res = await publicRequest.get(
        `/conversations/find/${user._id}/${friend._id}`
      );
      setCurrentChat(res.data);
      if (res.data === null) {
        const secondRes = await publicRequest.post("/conversations/", users);
        setCurrentChat(secondRes.data);
      }
    } catch (err) {
      console.log(err);
    }
    setText("");
  };

  return (
    <>
      <Topbar chat />
      <Hamburger />
      <Container>
        <Menu>
          <Wrapper>
            <Input
              onChange={(e) => {
                setText(e.target.value);
              }}
              darkMode={darkMode}
              placeholder="Search..."
            />
            {filUsers?.length !== 0 && text.length !== 0 && (
              <FilterContainer>
                {filUsers.map((f, i) => (
                  <FilteredUsers handleClick={handleClick} key={i} fUsers={f} />
                ))}
              </FilterContainer>
            )}
            {conversation.map((conv, index) => (
              <ChooseConv onClick={() => setCurrentChat(conv)} key={index}>
                <Conversation conversation={conv} currentUser={user} />
              </ChooseConv>
            ))}
          </Wrapper>
        </Menu>
        <Box>
          <Wrapper box>
            {currentChat ? (
              <>
                <Top>
                  {messages.map((m, i) => (
                    <MessageCon ref={messageRef} key={i}>
                      <Message currentChat={currentChat} own={m.sender === user._id} message={m} />
                    </MessageCon>
                  ))}
                </Top>
                <Bottom>
                  <TextArea
                    darkMode={darkMode}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    placeholder="Write something..."
                  />
                  <Send onClick={handleSubmit}>Send</Send>
                </Bottom>
              </>
            ) : (
              <Start>Open a new conversation to start a chat</Start>
            )}
          </Wrapper>
        </Box>
        <Online>
          <Wrapper>
            <ChatOnline
              chat
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </Wrapper>
        </Online>
      </Container>
    </>
  );
};

export default Chat;
