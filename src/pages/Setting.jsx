import { useContext, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  CoverImage,
  InfoName,
  PersonImage,
  ProfileCover,
  ProfileInfo,
  Right,
  RightBottom,
  RightTop,
} from "./Profile";
import { updateUser } from "../apiCalls";
import { uploadTaskPromise } from "../helpers";
import { useNavigate } from "react-router-dom";
import Hamburger from "../components/Hamburger";
import { Done, Error } from "@mui/icons-material";

const color = "#383e42";

const Inputs = styled.div`
  flex: 12;
`;
const Wrapper = styled.div`
  padding: 20px 30px;
  @media only screen and (max-width: 395px) {
    padding: 10px 15px;
  }
`;
const Form = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;
const FormCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const ItemCon = styled.div`
  width: 400px;
  margin: 20px 0px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    width: 250px;
  }
  @media only screen and (max-width: 395px) {
    width: 165px;
  }
`;
const ItemText = styled.label`
  margin-bottom: 5px;
`;
const Item = styled.input`
  padding: 5px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    padding-left: 5px;
  }
  @media only screen and (max-width: 395px) {
    padding: 3px;
  }
`;
const Select = styled.select`
  padding: 5px;
`;
const Options = styled.option``;
const ButtonCon = styled.div``;
const Button = styled.button`
  cursor: pointer;
  margin-top: 20px;
  padding: 5px 10px;
  width: 200px;
  background-color: ${color};
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  &:hover {
    background-color: ${(props) => props.darkMode && "white"};
    color: ${(props) => props.darkMode && `${color}`};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
export const MessageCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  background-color: ${(props) => (props.error ? "red" : "green")};
  padding: 5px;
  bottom: 10px;
  right: 10px;
  opacity: 0.7;
  border-radius: 5px;
  svg {
    color: white;
    margin-right: 5px;
    @media only screen and (max-width: 395px) {
      margin-right: 3px;
    }
  }
  @media only screen and (max-width: 395px) {
    padding: 2px 3px;
    right: 5px;
    border-radius: 3px;
    bottom: 50px;
  }
`;
export const ThrowMessage = styled.span`
  font-size: 16px;
  color: white;
  font-weight: 500;
  @media only screen and (max-width: 395px) {
    font-size: 12px;
    font-weight: 400;
  }
`;

const Setting = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profPic, setProfPic] = useState({});
  const [covPic, setCovPic] = useState({});
  const [success, setSuccess] = useState(false);
  const { user, darkMode, dispatch, isFetching, error } =useContext(AuthContext);
  const [inputs, setInputs] = useState({});
  let navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let profilPicURL;
    let coverPicURL;
    if (profPic.name) {
      profilPicURL = await uploadTaskPromise(profPic);
    }
    if (covPic.name) {
      coverPicURL = await uploadTaskPromise(covPic);
    }
    const userCredential = {
      ...inputs,
      profilePicture: profilPicURL,
      coverPicture: coverPicURL,
    };
    updateUser(userCredential, dispatch, user._id);
    if (!error) {
      setSuccess(true);
    }
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <Topbar />
      <Hamburger />
      <Container>
        <Sidebar />
        <Right>
          <RightTop>
            <ProfileCover>
              <CoverImage src={user?.coverPicture ||"https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} />
              <PersonImage src={user?.profilePicture || "https://images.pexels.com/photos/1172207/pexels-photo-1172207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} />
            </ProfileCover>
            <ProfileInfo>
              <InfoName>{user.username}</InfoName>
            </ProfileInfo>
          </RightTop>
          <RightBottom>
            <Inputs>
              <Wrapper>
                <Form onSubmit={handleClick}>
                  <FormCon>
                    <ItemCon>
                      <ItemText>Profil Picture</ItemText>
                      <Item
                        type="file"
                        name="nameProfilePicture"
                        id="profFile"
                        onChange={(e) => setProfPic(e.target.files[0])}
                      />
                    </ItemCon>
                    <ItemCon>
                      <ItemText>Cover Picture</ItemText>
                      <Item
                        type="file"
                        name="nameCoverPicture"
                        id="coverFile"
                        onChange={(e) => setCovPic(e.target.files[0])}
                      />
                    </ItemCon>
                    <ItemCon>
                      <ItemText>Username</ItemText>
                      <Item
                        name="username"
                        placeholder={user.username}
                        type="text"
                        onChange={handleChange}
                        autoComplete="username"
                      />
                    </ItemCon>
                    <ItemCon>
                      <ItemText>Password</ItemText>
                      <Item
                        name="password"
                        placeholder="password..."
                        type="password"
                        onChange={handleChange}
                        autoComplete="current-password"
                      />
                    </ItemCon>
                    <ItemCon>
                      <ItemText>Description</ItemText>
                      <Item
                        name="desc"
                        placeholder={user.desc}
                        type="text"
                        onChange={handleChange}
                      />
                    </ItemCon>
                    <ItemCon>
                      <ItemText>City</ItemText>
                      <Item
                        name="city"
                        placeholder={user.city}
                        type="text"
                        onChange={handleChange}
                      />
                    </ItemCon>
                    <ItemCon>
                      <ItemText>From</ItemText>
                      <Item
                        name="from"
                        placeholder={user.from}
                        type="text"
                        onChange={handleChange}
                      />
                    </ItemCon>
                    <ItemCon>
                      <ItemText>Email</ItemText>
                      <Item
                        name="email"
                        placeholder={user.email}
                        type="email"
                        onChange={handleChange}
                      />
                    </ItemCon>
                    <ItemCon>
                      <ItemText>Relationship</ItemText>
                      <Select onChange={handleChange} name="relationship">
                        <Options value="1">Single</Options>
                        <Options value="2">Married</Options>
                        <Options value="3">Has a relationship</Options>
                      </Select>
                    </ItemCon>
                  </FormCon>
                  <ButtonCon>
                    <Button
                      disabled={isFetching}
                      type="submit"
                      darkMode={darkMode}
                    >
                      Save
                    </Button>
                  </ButtonCon>
                </Form>
              </Wrapper>
            </Inputs>
            {success && (
              <MessageCon error={error}>
                <Done />
                <ThrowMessage>Profile has been updated...</ThrowMessage>
              </MessageCon>
            )}
            {error && (
              <MessageCon error={error}>
                <Error />
                <ThrowMessage>Something went wrong...</ThrowMessage>
              </MessageCon>
            )}
          </RightBottom>
        </Right>
      </Container>
    </>
  );
};

export default Setting;
