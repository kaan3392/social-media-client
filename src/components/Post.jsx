import { AddComment, Delete, Share, ThumbUp } from "@mui/icons-material";
import { publicRequest, userRequest } from "../requestMethods";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Comments from "./Comments";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";

const color = "#383e42";

const Container = styled.div`
  width: 95%;
  border-radius: 10px;
  -webkit-box-shadow: 3px 1px 15px 3px rgba(0, 0, 0, 0.24);
  box-shadow: 3px 1px 15px 3px rgba(0, 0, 0, 0.24);
  margin: 30px 0px;
  @media only screen and (max-width: 395px) {
    width: 95%;
    margin: 15px 0px;
}
`;

const Wrapper = styled.div`
  padding: 10px;
  @media only screen and (max-width: 395px) {
    padding: 5px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const TopLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  @media only screen and (max-width: 395px) {
    width: 30px;
    height: 30px;
  }
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: 500;
  margin: 0 10px;
  @media only screen and (max-width: 395px) {
    font-size: 14px;
    margin: 0 5px;
  }
`;

const Date = styled.span`
  font-size: 12px;
  @media only screen and (max-width: 395px) {
    font-size: 10px;
  }
`;

const TopRight = styled.div`
  svg {
    cursor: pointer;
    transition: all 0.4s ease;
    @media only screen and (max-width: 395px) {
    font-size: 18px;
  }
    &:hover {
      color: red;
      transform: scale(1.1);
    }
  }
`;

const Center = styled.div`
  margin: 20px 0px 10px 0px;
  @media only screen and (max-width: 395px) {
    margin: 5px 0px;
  }
`;

const Text = styled.span`
font-size: 14px;
`;

const PostImage = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  @media only screen and (max-width: 395px) {
    margin-top: 10px;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  @media only screen and (max-width: 395px) {
    padding: 0px 5px; 
  }
`;

const BottomLeft = styled.div`
  display: flex;
  align-items: center;
  svg {
    @media only screen and (max-width: 395px) {
    font-size: 16px;
  }
    cursor: pointer;
    &:first-child {
      color: ${(props) => props.isLiked && "blue"};
    }
  }
  @media only screen and (max-width: 395px) {
    
  }
`;

const Counter = styled.span`
  font-size: 15px;
  @media only screen and (max-width: 395px) {
    font-size: 13px;
  }
`;

const BottomRight = styled.div``;

const CommentNumber = styled.span`
  cursor: pointer;
  font-size: 15px;
  @media only screen and (max-width: 395px) {
    font-size: 13px;
  }
`;

const Choose = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
  
`;

const ChooseItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: ${(props) => (props.darkMode ? `${color}` : "lightgray")};
    border-radius: 5px;
  }
  @media only screen and (max-width: 395px) {
    padding: 2px;
    flex-direction: column;
  }
  svg{
    @media only screen and (max-width: 395px) {
    font-size: 15px;
  }
  }
`;

const ChooseItemText = styled.span`
  margin-left: 5px;
  @media only screen and (max-width: 395px) {
    display: none;
  }
`;

const Hr = styled.hr`
  margin: 5px 0px;
  border-color: ${(props) => props.darkMode && `${color}`};
`;

const Post = ({ post }) => {
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser, darkMode } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const getUser = async () => {
      const res = await publicRequest.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    getUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await userRequest.put(`/posts/${post._id}/like`);
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    //send notification to socket
    if (!isLiked) {
      socket.emit("sendNot", {
        receiverId: post.userId,
        senderName: currentUser.username,
        type: "liked",
      });
    }
  };

  const handleShare = () => {
    console.log("shared");
    socket.emit("sendNot", {
      receiverId: post.userId,
      senderName: currentUser.username,
      type: "shared",
    });
  };

  const handleDelete = async () => {
    try {
      await userRequest.delete("/posts/" + post._id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Top>
          <TopLeft>
            <Link to={`profile/${user.username}`}>
              <ProfilePic src={user.profilePicture } />
            </Link>
            <Username> {user.username}</Username>
            <Date>{format(post?.createdAt)}</Date>
          </TopLeft>
          {post.userId === currentUser._id && (
            <TopRight>
              <Delete onClick={handleDelete} />
            </TopRight>
          )}
        </Top>
        <Center>
          <Text>{post?.desc}</Text>
          <PostImage src={post?.img} />
        </Center>
        <Bottom>
          <BottomLeft isLiked={isLiked}>
            <ThumbUp style={{ margin: "5px" }} />
            <Counter>{like} likes</Counter>
          </BottomLeft>
          <BottomRight>
            {post.comments.length !== 0 && (
              <CommentNumber onClick={() => setShow(!show)}>
                {post?.comments.length} comments
              </CommentNumber>
            )}
          </BottomRight>
        </Bottom>
        <Hr darkMode={darkMode} />
        <Choose>
          <ChooseItem darkMode={darkMode} onClick={likeHandler}>
            <ThumbUp />
            <ChooseItemText>Like</ChooseItemText>
          </ChooseItem>
          <ChooseItem darkMode={darkMode} onClick={() => setShow(!show)}>
            <AddComment />
            <ChooseItemText>Comment</ChooseItemText>
          </ChooseItem>
          <ChooseItem onClick={handleShare} darkMode={darkMode}>
            <Share />
            <ChooseItemText>Share</ChooseItemText>
          </ChooseItem>
        </Choose>
        {show && (
          <>
            <Hr darkMode={darkMode} />
            <Comments post={post} />
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Post;
