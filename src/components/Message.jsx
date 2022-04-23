import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import {format} from "timeago.js"
import { AuthContext } from "../context/AuthContext"
import { publicRequest } from "../requestMethods"

const color = "#383e42"

const Container = styled.div`
display: flex;
flex-direction: column;
align-items:${props => props.own && "flex-end"};
padding-right:${props => props.own && "8px"};
`
const Top = styled.div`
display: flex;
align-items: center;
`
const Image = styled.img`
width: 35px;
height: 35px;
object-fit: cover;
border-radius: 50%;
margin-right: 10px;
@media only screen and (max-width: 395px) {
    width: 25px;
    height: 25px;
    margin-right: 6px;
  }
`
const Text = styled.p`
padding: 10px;
border-radius: 20px;
background-color: ${props => props.own ? "lightgray" : `${color}`};
color: ${props => props.own ? "black" : "white"};
max-width: 300px;
@media only screen and (max-width: 395px) {
    padding: 5px;
    font-size: 12px;
  }
`
const Bottom = styled.div`
font-size: 12px;
margin: 10px 0px;
@media only screen and (max-width: 395px) {
    font-size: 10px;
    margin: 6px 0px;
  }
`

const Message = ({ message, own, currentChat }) => {
    const {user} = useContext(AuthContext)
    const [friend, setFriend] = useState({})
    const receiverId = currentChat.members.find((m) => m !== user._id);

    useEffect(()=>{
        const getFriend = async () => {
            const res = await publicRequest.get("/users?userId="+receiverId);
            setFriend(res.data)
        }
        getFriend()
    },[receiverId])
    return (
        <Container own={own}>
            <Top>
                <Image src={own ? user.profilePicture : friend.profilePicture } />
                <Text own={own} >{message.text} </Text>
            </Top>
            <Bottom>
                {format(message.createdAt)}
            </Bottom>
        </Container>
    )
}

export default Message