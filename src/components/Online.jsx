import styled from "styled-components"

const Friend = styled.li`
display: flex;
align-items: center;
margin-bottom: 15px;
`;

const ImageContainer = styled.div`
margin-right: 10px;
position: relative;
`;

const Image = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
`;

const OnlineBadge = styled.span`
width: 12px;
height: 12px;
border-radius:50%;
background-color: limegreen;
position: absolute;
top: -2;
right: 0;
border: 2px solid white;
`

const Username = styled.span`
font-weight: 500;
`


const Online = ({user}) => {

  return (
    <Friend>
    <ImageContainer>
      <Image src={user.profilePicture}/>
      <OnlineBadge/>
    </ImageContainer>
    <Username>{user.username}</Username>
  </Friend>
  )
}

export default Online