import styled from "styled-components"

const Container = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
cursor: pointer;
padding: 10px 5px;
border-radius: 5px;
left: 10px;
&:hover{
    background-color: #616161;
}
@media only screen and (max-width: 395px) {
    padding: 5px 2px;
    left: 5px;
  }
`;

const Image = styled.img`
width: 25px;
height: 25px;
object-fit: cover;
border-radius: 50%;
margin-right: 15px;
border: 1px solid darkgray;

`;

const Username = styled.span`
font-size: 15px;
font-weight: 400;
color: white;
`;

const FilteredUsers = ({fUsers, handleClick}) => {
  return (
    <Container onClick={()=>handleClick(fUsers)}>
        <Image src={fUsers.profilePicture}/>
        <Username>{fUsers.username}</Username>
    </Container>
  )
}

export default FilteredUsers