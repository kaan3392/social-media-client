import { Bookmark, Chat, Event, Group, HelpOutline, Home, PlayCircleFilledOutlined, School, WorkOutline } from "@mui/icons-material";
import styled from "styled-components"
import { NavLink } from "react-router-dom";

const color = "#383e42"

const Container = styled.div`
flex: 4.5;
height: calc(100vh - 50px);
overflow-y: scroll;
position: sticky;
top: 10px;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track{
        background-color: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb{
        background-color: rgb(179,179,179);
    }
    @media only screen and (max-width: 768px) {
    display:none;
  }

`;

const Wrapper = styled.div`
padding: 10px 20px 20px 20px;
display: flex;
flex-direction: column;
@media only screen and (max-width: 768px) {
    padding: 10px
  }
`;

const List = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
margin: 10px 0px;
`;

const ListItem = styled(NavLink)`
list-style: none;
margin-top: 20px;
position: relative;
color: inherit;
line-height: 40px;
text-decoration: none;
display: flex;
align-items: center;
transition: all 0.5s ease-out;

svg {
    font-size: 40px;
}

&:hover{
    color: black;

    svg {
        opacity: 0;
        transition: all 0.5 ease-out;
    }

    &::after{
        opacity: 1;
    }
}
&::after{
    content: "";
    font-size: 24px;
    letter-spacing: 2px;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    opacity: 0;
    transition: all 0.3s ease-out;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
}
&:first-child{
    &::after{
        content: "HOME";
    }
}
&:nth-child(2){
    &::after{
        content: "CHATS";
    }
}
&:nth-child(3){
    &::after{
        content: "VIDEOS";
    }
}
&:nth-child(4){
    &::after{
        content: "GROUPS";
    }
}
&:nth-child(5){
    &::after{
        content: "BOOKMARKS";
    }
}
&:nth-child(6){
    &::after{
        content: "QUESTIONS";
    }
}
&:nth-child(7){
    &::after{
        content: "JOBS";
    }
}
&:nth-child(8){
    &::after{
        content: "EVENTS";
    }
}
&:nth-child(9){
    &::after{
        content: "COURSES";
    }
}
`;

const Button = styled.button`
width: 80%;
border:none;
padding: 10px;
border-radius: 5px;
font-weight: 600;
cursor: pointer;
display: block;
align-self: center;
background-color: ${color};
color: white;
border:1px solid ${color};
&:hover{
    background-color: white;
    color: ${color};
    border: 1px solid ${color};
}
@media only screen and (max-width: 768px) {
    width: 70%;
  }
`;

const Hr = styled.hr`
margin: 20px 0px;
`;

const AdImg = styled.img`
width: 90%;
border-radius: 10px;
margin: 30px 0px;
display: flex;
justify-content: flex-end;
align-items: flex-start;
@media only screen and (max-width: 768px) {
    display: none;
  }


`;

const Sidebar = () => {
    return (
        <Container>
            <Wrapper>
                <List>
                    <ListItem exact="true" to="/">
                        <Home/>
                    </ListItem>
                    <ListItem exact="true" to="/chat">
                        <Chat />
                    </ListItem>
                    <ListItem exact="true" to="/">
                        <PlayCircleFilledOutlined />
                    </ListItem>
                    <ListItem exact="true" to="/">
                        <Group />
                    </ListItem>
                    <ListItem exact="true" to="/">
                        <Bookmark />
                    </ListItem>
                    <ListItem exact="true" to="/">
                        <HelpOutline />
                    </ListItem>
                    <ListItem exact="true" to="/">
                        <WorkOutline />
                    </ListItem>
                    <ListItem exact="true" to="/">
                        <Event />
                    </ListItem>
                    <ListItem exact="true" to="/">
                        <School />
                    </ListItem>
                </List>
                <Button>Show More</Button>
                <Hr/>
                <AdImg src="/assets/ad.jpeg" />
            </Wrapper>
        </Container>
    )
}

export default Sidebar
