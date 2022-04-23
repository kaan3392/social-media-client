import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { AuthContext } from "../context/AuthContext"
import { publicRequest } from "../requestMethods"

const Container = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
padding: 10px;
cursor: pointer;
margin-top: 15px;
border-radius: 10px;
&:hover{
  background-color: ${props => props.darkMode ? "#222" : "#f5f3f3"};
}
@media only screen and (max-width: 395px) {
    padding: 5px 0px;
    margin-top: 10px;
  }
`
const Image = styled.img`
width: 38px;
height: 38px;
border-radius: 50%;
object-fit: cover;
margin-right: 15px;
@media only screen and (max-width: 395px) {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }

`
const Text = styled.span`
font-size: 20px;
font-weight: 400;
@media only screen and (max-width: 395px) {
    font-size: 14px;
  }
`

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const { darkMode } = useContext(AuthContext);

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await publicRequest("/users?userId=" + friendId);
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser();
  }, [currentUser, conversation])

  return (
    <Container darkMode={darkMode}>
      <Image src={user?.profilePicture} />
      <Text>{user?.username}</Text>
    </Container>
  )
}

export default Conversation;