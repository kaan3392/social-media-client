import {useEffect, useState } from "react"
import styled from "styled-components"
import Feed from "../components/Feed"
import RightBar from "../components/RightBar"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import { useParams } from "react-router"
import { publicRequest } from "../requestMethods"
import Hamburger from "../components/Hamburger"

export const Container = styled.div`
display: flex;
width: 100%;
min-height: 100vh;
overflow: hidden;
`;

export const Right = styled.div`
flex:18;
`;

export const RightTop = styled.div`

`;

export const ProfileCover = styled.div`
height: 420px;
position: relative;
@media only screen and (max-width: 395px) {
    height: 260px;
  }
`;

export const CoverImage = styled.img`
width: 100%;
height: 350px;
object-fit: cover;
@media only screen and (max-width: 395px) {
    height: 200px;
  }
`;

export const PersonImage = styled.img`
width: 150px;
height: 150px;
border-radius: 50%;
object-fit: cover;
position: absolute;
left: 0;
right: 0;
top: 250px;
margin: auto;
border: 2px solid gray;
@media only screen and (max-width: 395px) {
    width: 100px;
    height: 100px;
    top: 150px;
  }
`;

export const ProfileInfo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export const InfoName = styled.h4`
font-size: 24px;
font-weight: 500;
@media only screen and (max-width: 395px) {
font-size: 20px;
  }
`;

export const InfoDesc = styled.span`
font-weight: 300;
@media only screen and (max-width: 395px) {
    font-size: 15px
  }
`;

export const RightBottom = styled.div`
display: flex;
position: relative;
`;

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;

    useEffect(() => {
        
        const fetchUser = async () => {
            const res = await publicRequest.get(`/users?username=${username}`);
            setUser(res.data);
        }
        fetchUser();
    }, [username]);

    return (
        <>
            <Topbar />
            <Hamburger/>
            <Container>
                <Sidebar />
                <Right>
                    <RightTop>
                        <ProfileCover>
                            <CoverImage src={user.coverPicture} />
                            <PersonImage src={user.profilePicture} />
                        </ProfileCover>
                        <ProfileInfo>
                            <InfoName>{user.username}</InfoName>
                            <InfoDesc>{user.desc}</InfoDesc>
                        </ProfileInfo>
                    </RightTop>
                    <RightBottom>
                            <Feed username={username} />
                            <RightBar user={user} />
                    </RightBottom>
                </Right>
            </Container>
        </>
    )
}

export default Profile