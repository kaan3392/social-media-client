import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { AuthContext } from "../context/AuthContext"
import { publicRequest } from "../requestMethods"

const color = "#383e42"
const Container = styled.div`
display: flex;
flex-direction: column;
`
const OnlineFriends = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
cursor: pointer;
padding: 5px 0px 5px 5px;
border-radius: 5px;
border-left:${props=> props.darkMode ? `5px solid #333` : "5px solid white"} ;
&:hover{
    border-left: 5px solid limegreen;
    background-color: ${props => props.darkMode ? `${color}` : "#f6f8f6"};
}
@media only screen and (max-width: 395px) {
    padding: 5px;
  }
`
const ImageCon = styled.div`
position: relative;
`
const Image = styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
object-fit: cover;
margin-right: 5px;
border: 1px solid gray;
@media only screen and (max-width: 395px) {
    width: ${props=>props.chat ? "25px":"30px"};
    height: ${props=>props.chat ? "25px":"30px"};
    
  }
`
const Badge = styled.div`
width: 10px;
height: 10px;
border-radius: 50%;
background-color: limegreen;
position: absolute;
top: 0;
right: 5px;

`
const Name = styled.span`
font-size: 20px;
font-weight: 400;
color: ${props => props.darkMode ? "white" : "black"};
align-self: center;
@media only screen and (max-width: 395px) {
    font-size:${props => props.chat ? "14px":"16px"};
    
  }
`
const NoOnline = styled.span`
font-size: 14px;
letter-spacing: 1px;
animation: big;
animation-duration: 15s;
animation-iteration-count: infinite;
text-align: center;
@keyframes big {
    0%{font-size: 14px;}
    50%{font-size: 16px;}
    100%{font-size: 14px;}
}
@media only screen and (max-width: 395px) {
    animation: none;
  }
`
const ChatOnline = ({ onlineUsers, currentId, setCurrentChat, chat }) => {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const {darkMode} = useContext(AuthContext)

    useEffect(() => {
        const getFriends = async () => {
            const res = await publicRequest.get("/users/friends/" + currentId);
            setFriends(res.data);
        };
        getFriends();
    }, [currentId]);


    useEffect(() => {
        setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)));
    }, [onlineUsers, friends]);

    const handleClick = async (user) => {
        const users = {
            senderId:currentId,
            receiverId:user._id
        };
        try {
            const res = await publicRequest.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
            if(res.data === null){
              const secondRes = await publicRequest.post("/conversations/", users);
              setCurrentChat(secondRes.data);
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Container>
            {onlineFriends.map((o, i) => (
                <OnlineFriends darkMode={darkMode} key={i} onClick={() => handleClick(o)}>
                    <ImageCon>
                        <Image chat={chat} src={o?.profilePicture} />
                        <Badge />
                    </ImageCon>
                    <Name chat={chat} darkMode={darkMode}>{o?.username}</Name>
                </OnlineFriends>
            ))}
            {onlineFriends.length === 0 && <NoOnline>sorry your friends are enjoying life right now...</NoOnline>}
        </Container>
    )
}

export default ChatOnline