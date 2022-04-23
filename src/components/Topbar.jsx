import {
  Search,
  Person,
  Chat,
  Notifications,
  WbSunny,
  Logout,
  Settings,
  Home,
  Menu,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import FilteredUsers from "./FilteredUsers";
import { publicRequest } from "../requestMethods";

export const color = "#383e42";

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: ${color};
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
  @media only screen and (max-width: 395px) {
    height: 40px;
  }
`;
const Left = styled.div`
  flex: 3;
  @media only screen and (max-width: 768px) {
    flex: 2.5;
  }
  @media only screen and (max-width: 395px) {
    display: none;
  }
`;
const Logo = styled.span`
  font-size: 24px;
  text-shadow: 2px 2px 3px white;
  margin-left: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  letter-spacing: 4px;
  &:hover {
    color: blue;
  }
`;
const Center = styled.div`
  flex: 5;
  @media only screen and (max-width: 395px) {
    flex: 4;
  }
`;
const Searchbar = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${(props) => (props.darkMode ? "#333" : "white")};
  border-radius: 30px;
  display: flex;
  align-items: center;
  position: relative;
  transition: all 1s ease;

  @media only screen and (max-width: 768px) {
    width: 90%;
    margin-left: 10px;
  }

  @media only screen and (max-width: 395px) {
    width: 90%;
  }
`;
const Input = styled.input`
  border: none;
  width: 90%;
  transition: all 1s ease;
  background-color: ${(props) => (props.darkMode ? "#333" : "white")};
  color: ${(props) => props.darkMode && "white"};
  &::placeholder {
    color: ${(props) => props.darkMode && "white"};
  }
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 768px) {
    width: 75%;
    font-size: 12px;
  }
  @media only screen and (max-width: 395px) {
    width: 50%;
    &::placeholder {
      font-size: 13px;
    }
  }
`;
const Right = styled.div`
  flex: 4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
  @media only screen and (max-width: 768px) {
    flex: 4.5;
  }
  @media only screen and (max-width: 395px) {
    flex: 5;
  }
`;
const Links = styled.div``;
const Icons = styled.div`
  display: flex;
  position: relative;
  `;
const IconItem = styled.div`
position: relative;
  margin-right: 15px;
  cursor: pointer;
`;
const IconsBadge = styled.span`
  width: 16px;
  height: 16px;
  background-color: red;
  border-radius: 50%;
  color: white;
  position: absolute;
  top: -3px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  @media only screen and (max-width: 768px) {
    width: 12px;
    height: 12px;
    top: -2px;
    right: -2px;
    font-size: 11px;
  }
`;
const Img = styled.img`
  width: 38px;
  height: 38px;
  border: 0.5px solid gray;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin-right: 10px;
`;
const ExitCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
    &:nth-child(3) {
      &:hover {
        color: blue;
      }
    }
    &:nth-child(1) {
      &:hover {
        color: blue;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }

  @media only screen and (max-width: 395px) {
    display: none;
  }
`;
const FilterCon = styled.div`
  position: absolute;
  background-color: ${color};
  width: 400px;
  margin-top: 10px;
  border-radius: 0px 0px 5px 5px;
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
  @media only screen and (max-width: 395px) {
    width: 150px;
    margin-left: 10px;
  }
`;
const ToggleCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    cursor: pointer;
    color: ${(props) => (props.darkMode ? "gray" : "yellow")};
    transition: all 0.5 ease;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
  @media only screen and (max-width: 395px) {
    display: none;
  }
`;
const NotificationsCon = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  width: 150px;
  display: flex;
  flex-direction: column;
  background-color: ${color};
  border-radius: 5px;
`;
const NotificationsText = styled.span`
  color: white;
  font-size: 13px;
  text-align: start;
  padding: 5px;
  margin-left: 5px;
`;
const NotButton = styled.button`
  width: 70%;
  align-self: center;
  margin: 10px 0px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid gray;
  padding: 5px;
  background-color: blue;
  color: white;
`;
const HomeCon = styled(Link)`
  text-decoration: none;
  color: white;
  display: none;
  margin-right: 15px;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    display: flex;
  }
  @media only screen and (max-width: 395px) {
    display: flex;
  }
`;
const MenuCon = styled.div`
  display: none;
  cursor: pointer;
  svg {
    color: white;
  }
  @media only screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: end;
  }
  @media only screen and (max-width: 395px) {
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;

const Topbar = ({ chat }) => {
  const { user, dispatch, darkMode, not } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [text, setText] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [filUsers, setFilUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  let navigate = useNavigate();

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

  const userLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  //GET LIKE
  useEffect(() => {
    socket.off("getNot").on("getNot", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [notifications, socket]);

  const displayNot = ({ senderName, type }) => {
    if (type === "liked" || type === "shared" || type === "commented") {
      return (
        <NotificationsText>{`${senderName} ${type} your post`}</NotificationsText>
      );
    }
    if (type === "followed" || type === "unfollowed") {
      return (
        <NotificationsText>{`${senderName} has ${type} you`}</NotificationsText>
      );
    }
  };

  const handleRead = () => {
    setNotifications([]);
    dispatch({ type: "NOT_OFF" });
  };

  useEffect(() => {
    socket.off("getMessage").on("getMessage", (data) => {
      setArrivalMessage((prev) => [...prev, data]);
    });
  }, [socket, arrivalMessage]);

  const followedNum = notifications.filter((n) => n.type === "followed").length;
  const total = notifications.filter(
    n =>
      n.type === "shared" ||
      n.type === "liked" ||
      n.type === "unfollowed" ||
      n.type === "commented"
  ).length;

  return (
    <Container>
      <Left>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <Logo>Social.</Logo>
        </Link>
      </Left>
      <Center>
        <Searchbar darkMode={darkMode}>
          <Search
            style={{
              color: "gray",
              fontSize: 22,
              marginLeft: 10,
              marginRight: 3,
            }}
          />
          <Input
            darkMode={darkMode}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Search..."
          />
        </Searchbar>
        {filUsers?.length !== 0 && text.length !== 0 && (
          <FilterCon>
            {filUsers.map((f, i) => (
              <Link
                to={`/profile/${f.username}`}
                key={i}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <FilteredUsers fUsers={f} />
              </Link>
            ))}
          </FilterCon>
        )}
      </Center>
      <Right>
        <Links>
          <ToggleCon
            darkMode={darkMode}
            onClick={() => dispatch({ type: "TOGGLE" })}
          >
            <WbSunny />
          </ToggleCon>
        </Links>
        <Icons>
          <HomeCon
            onClick={() => {
              dispatch({ type: "NOT_OFF" });
              dispatch({ type: "HAMBURGER_OFF" });
            }}
            to="/"
          >
            <Home />
          </HomeCon>
          <IconItem
            onClick={() => {
              dispatch({ type: "NOT" });
              dispatch({ type: "HAMBURGER_OFF" });
            }}
          >
            <Person />
            <IconsBadge>{followedNum}</IconsBadge>
          </IconItem>
          <Link style={{ color: "inherit", textDecoration: "none" }} to="/chat">
            <IconItem>
              <Chat />
              {!chat && <IconsBadge>{arrivalMessage.length}</IconsBadge>}
            </IconItem>
          </Link>
          <IconItem
            onClick={() => {
              dispatch({ type: "NOT" });
              dispatch({ type: "HAMBURGER_OFF" });
            }}
          >
            <Notifications />
            <IconsBadge>{total}</IconsBadge>
          </IconItem>
          {not && (
            <NotificationsCon>
              {notifications.map((n) => displayNot(n))}
              {(total > 0 || followedNum > 0) && (
                <NotButton onClick={handleRead}>Mark as Read</NotButton>
              )}
            </NotificationsCon>
          )}
        </Icons>
        <MenuCon
          onClick={() => {
            dispatch({ type: "HAMBURGER" });
            dispatch({ type: "NOT_OFF" });
          }}
        >
          <Menu />
        </MenuCon>
        <ExitCon>
          <Link
            style={{ display: "flex", alingItems: "center" }}
            to={`/profile/${user.username}`}
          >
            <Img src={user.profilePicture} />
          </Link>
          {user && (
            <>
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
                to="/setting"
              >
                <Settings />
              </Link>
              <Logout
                onClick={userLogout}
                style={{ marginLeft: "10px", cursor: "pointer" }}
              />
            </>
          )}
        </ExitCon>
      </Right>
    </Container>
  );
};

export default Topbar;
