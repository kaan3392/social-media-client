import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest, userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import { Add, Remove } from "@mui/icons-material";
import ChatOnline from "./ChatOnline";

const color = "#383e42";

const Container = styled.div`
  flex: 5;
  @media only screen and (max-width: 395px) {
    flex:${props => props.home && "4"};
  }
`;
const Wrapper = styled.div`
  padding: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 395px) {
    padding: 10px 10px 0px 0px;
  }
`;
const Birthday = styled.div`
  display: flex;
  align-items: center;
`;
const BirthImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  @media only screen and (max-width: 395px) {
    display: none;
  }
`;
const BirthText = styled.span`
  font-weight: 300;
  font-size: 15px;
  @media only screen and (max-width: 395px) {
    font-size: 13px;
  }
`;
const Title = styled.h4`
  margin: 20px 0px 10px 0px;
  text-align: center;
  @media only screen and (max-width: 395px) {
    font-size: 15px;
    font-weight: 400;
  }
`;
const RightbarTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 5px;
  border-bottom: 2px solid white;
  @media only screen and (max-width: 395px) {
    font-size: 13px;
    font-weight: 400;
  }
`;
const RightbarInfo = styled.div`
  margin-bottom: 30px;
  @media only screen and (max-width: 395px) {
    margin-bottom: 20px;
  }
`;
const RightbarInfoItem = styled.div`
  margin-bottom: 10px;
`;
const RightbarInfoKey = styled.span`
  font-weight: 500;
  margin-right: 15px;
  color: #555;
  @media only screen and (max-width: 395px) {
    margin-right: 5px;
    font-size: 13px;
  }
`;
const RightbarInfoValue = styled.span`
  font-weight: 300;
  @media only screen and (max-width: 395px) {
    font-size: 13px;
  }
`;
const Followings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  -webkit-box-shadow: 5px 5px 12px -3px rgba(0, 0, 0, 0.08);
  box-shadow: 5px 5px 12px -3px rgba(0, 0, 0, 0.08);
  width: 100%;
`;
const Following = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin: 5px;
`;
const FollowingImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  @media only screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
  @media only screen and (max-width: 395px) {
    width: 38px;
    height: 38px;
  }
`;
const Username = styled.span`
  text-align: center;
  color: ${(props) => (props.darkMode ? "white" : `black`)};
  @media only screen and (max-width: 395px) {
    font-size: 15px;
    font-weight: 300;
  }
`;
const Follow = styled.button`
  padding: 2px 8px;
  width:110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${color};
  color: white;
  cursor: pointer;
  border: 1px solid ${color};
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: white;
    color: ${color};
    border: 1px solid ${color};
  }
  @media only screen and (max-width: 395px) {
    padding: 2px 4px;
    align-self: center;
  }
`;

const RightBar = ({ user, onlineUsers, home }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch, darkMode } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [followed, setFollowed] = useState(null);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [user, currentUser.followings]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (!user?._id) return;
        const res = await publicRequest.get(`/users/friends/${user._id}`);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await userRequest.put("/users/" + user._id + "/unfollow");
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await userRequest.put("/users/" + user._id + "/follow");
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);

    if (followed) {
      socket.emit("sendNot", {
        receiverId: user._id,
        senderName: currentUser.username,
        type: "unfollowed",
      });
    } else {
      socket.emit("sendNot", {
        receiverId: user._id,
        senderName: currentUser.username,
        type: "followed",
      });
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <Birthday>
          <BirthImage src="/assets/gift.png" />
          <BirthText>
            <b> Tommy</b> and <b> 2 other friends </b> have a birthday today.
          </BirthText>
        </Birthday>
        <Title>Online Friends</Title>
        <Link to="chat" style={{ color: "inherit", textDecoration: "none" }}>
          <ChatOnline onlineUsers={onlineUsers} currentId={currentUser._id} />
        </Link>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <Follow darkMode={darkMode} onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </Follow>
        )}
        <RightbarTitle>User Information</RightbarTitle>
        <RightbarInfo>
          <RightbarInfoItem>
            <RightbarInfoKey>City:</RightbarInfoKey>
            <RightbarInfoValue>{user.city}</RightbarInfoValue>
          </RightbarInfoItem>
          <RightbarInfoItem>
            <RightbarInfoKey>From:</RightbarInfoKey>
            <RightbarInfoValue>{user.from}</RightbarInfoValue>
          </RightbarInfoItem>
          <RightbarInfoItem>
            <RightbarInfoKey>Relation:</RightbarInfoKey>
            <RightbarInfoValue>
              {user.relationship === 1
                ? " Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </RightbarInfoValue>
          </RightbarInfoItem>
        </RightbarInfo>
        <RightbarTitle>
          User Friends :
          {friends.length > 0 ? friends.length + " friends" : "none "}
        </RightbarTitle>
        <Followings>
          {friends.map((f, i) => (
            <Link
              key={i}
              style={{ color: "inherit", textDecoration: "none" }}
              to={`/profile/${f.username}`}
            >
              <Following>
                <FollowingImg src={f.profilePicture} />
                <Username darkMode={darkMode}>{f.username}</Username>
              </Following>
            </Link>
          ))}
        </Followings>
      </>
    );
  };

  return (
    <Container home={home}>
      <Wrapper>{user ? <ProfileRightbar /> : <HomeRightbar />}</Wrapper>
    </Container>
  );
};

export default RightBar;
