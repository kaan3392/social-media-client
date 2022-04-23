import { EmojiEmotions, PhotoCamera, Send } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { userRequest } from "../requestMethods";
import { format } from "timeago.js";
import { SocketContext } from "../context/SocketContext";

const color = "#383e42";

const Container = styled.div`
  width: 100%;
  transition: all 1s ease-out;
`;
const Wrapper = styled.div`
  padding: 5px;
`;
const Comment = styled.div`
  display: flex;
  align-items: center;
`;
const CommentImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
  @media only screen and (max-width: 395px) {
    width: 30px;
    height: 30px;
  }
`;
const CommentLine = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => (props.darkMode ? `${color}` : "lightgray")};
  transition: all 1s ease;
  color: white;
  padding: 5px 10px;
  margin-left: 5px;
  display: flex;
  svg {
    &:nth-child(2){
      @media only screen and (max-width: 395px) {
    display: none;
  }
    }
    &:nth-child(3){
      @media only screen and (max-width: 395px) {
    display: none;
  }
    }
    &:nth-child(4){
      @media only screen and (max-width: 395px) {
    font-size: 14px;
  }
    }
    color: grey;
    margin-left: 5px;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
`;
const Commenttext = styled.input`
  width: 95%;
  border: none;
  color: ${(props) => props.darkMode && "white"};
  font-size: 15px;
  background-color: inherit;
  &::placeholder {
    color: ${(props) => props.darkMode && "white"};
  }
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 395px) {
    font-size: 13px;
    font-weight: 400;
  }
`;
const Others = styled.div`
`;
const OtherComments = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media only screen and (max-width: 768px) {
    margin-top: 5px;
  }
`;
const OtherCommentImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  @media only screen and (max-width: 395px) {
    width: 30px;
    height: 30px;
  }
`;
const OtherCommentLine = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  transition: all 1s ease;
  background-color: ${(props) => (props.darkMode ? `${color}` : "lightgray")};
  border-radius: 10px;
  padding: 5px 10px;
  @media only screen and (max-width: 395px) {
    padding: 3px 5px;
  }
`;
const Username = styled.span`
  font-size: 11px;
  font-weight: 500;
`;

const OtherCommentsText = styled.div`
  font-size: 16px;
  font-weight: 300;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
   
  }
`;

const Time = styled.span`
  font-size: 10px;
  font-weight: 300;
  @media only screen and (max-width: 395px) {
    font-size: 9px;
  }
`;

const Comments = ({ post }) => {
  const { user, darkMode } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [input, setInput] = useState("");

  const addComment = async () => {
    const value = {
      profilePic: user.profilePicture,
      comment: input,
      name: user.username,
      createdAt: new Date(),
    };
    try {
     await userRequest.put(`/posts/${post._id}/comment`, { value });
     socket.emit("sendNot", {
      receiverId: post.userId,
      senderName: user.username,
      type:"commented"
    });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <Container>
      <Wrapper>
        <Comment>
          <CommentImage src={user.profilePicture} />
          <CommentLine darkMode={darkMode}>
            <Commenttext
              darkMode={darkMode}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              placeholder="say something..."
            />
            <EmojiEmotions />
            <PhotoCamera />
            <Send onClick={addComment} />
          </CommentLine>
        </Comment>
        <Others>
          {post.comments.map((p) => (
            <OtherComments>
              <OtherCommentImage src={p.profilePic} /> 
              <OtherCommentLine darkMode={darkMode}>
                <Username>{p.name}</Username>
                <OtherCommentsText>{p.comment}</OtherCommentsText>
                <Time>{format(p.createdAt)}</Time>
              </OtherCommentLine>
            </OtherComments>
          ))}
        </Others>
      </Wrapper>
    </Container>
  );
};

export default Comments;