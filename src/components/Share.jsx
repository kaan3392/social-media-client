import { Cancel, EmojiEmotions, PermMedia, Room } from "@mui/icons-material";
import { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { publicRequest } from "../requestMethods";
import { uploadTaskPromise } from "../helpers";
import { CircularProgress } from "@mui/material";

const color = "#383e42";

const Container = styled.div`
  width: 95%;
  border-radius: 10px;
  -webkit-box-shadow: 3px 1px 15px 3px rgba(0, 0, 0, 0.24);
  box-shadow: 3px 1px 15px 3px rgba(0, 0, 0, 0.24);
  flex-wrap: wrap;
  @media only screen and (max-width: 395px) {
    width: 95%;
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
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  @media only screen and (max-width: 395px) {
    width: 30px;
    height: 30px;
  }
`;
const Input = styled.input`
  border: none;
  width: 80%;
  font-size: 20px;
  background-color: ${(props) => props.darkMode && "#333"};
  color: ${(props) => props.darkMode && "white"};
  transition: all 1s ease;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.darkMode && "white"};
  }
  @media only screen and (max-width: 395px) {
    width: 70%;
    font-size: 13px;
  }
`;
const Hr = styled.hr`
  margin: 20px;
  border-color: ${(props) => props.darkMode && `${color}`};
  @media only screen and (max-width: 395px) {
    margin: 10px;
  }
`;
const ImgCon = styled.div`
  padding: 0 20px 10px 20px;
  position: relative;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 395px) {
    padding: 0px 10px 5px 10px;
    width: 50%;
  }

  svg {
    position: absolute;
    top: 0;
    right: 20px;
    cursor: pointer;
    opacity: 0.7;
    @media only screen and (max-width: 395px) {
    right: 10px;
  }
    &:hover {
      color: white;
    }
  }
`;
const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Bottom = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;
  @media only screen and (max-width: 768px) {
    padding: 0px 20px;
   
  }
  @media only screen and (max-width: 395px) {
    padding: 0 10px;
  }
`;
const Options = styled.div`
  display: flex;
  margin-right: 10px;
  
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: start;
    align-items: center;
   
  }
  @media only screen and (max-width: 395px) {
    margin-right: 5px;
  }
`;
const OptionText = styled.span`
  display: flex;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  @media only screen and (max-width: 395px) {
    font-size: 12px;
    font-weight: 400;
  }
`;
const OptionTextVideo = styled.label`
  display: flex;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  @media only screen and (max-width: 395px) {
    font-size: 12px;
    font-weight: 400;
  }
  
`;
const File = styled.input`
  display: none;
`;
const Button = styled.button`
  border: 1px solid ${color};
  padding: 8px 12px;
  border-radius: 5px;
  background-color: ${color};
  font-weight: 500;
  cursor: pointer;
  color: white;
  margin-right: 20px;
  transition: all 0.2s ease;
  &:hover {
    color: ${color};
    border: 1px solid ${color};
    background-color: white;
    transform: scale(1.1);
    transition: all 0.2s ease;
  }
  &:disabled {
    cursor: not-allowed;
  }
  @media only screen and (max-width: 768px) {
    margin: 0px 5px;
  }
  @media only screen and (max-width: 395px) {
    padding: 4px 8px;
  }
`;
const LoadingCon = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
`

const Share = ({ trigger }) => {
  const { user, darkMode } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  const submitPost = async (post) => {
    try {
      await publicRequest.post("/posts", post);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingFile(true);
    
    let profilePicURL;
    if (file) {
      profilePicURL = await uploadTaskPromise(file);
    }
    const newPost = { img: profilePicURL, userId: user._id, desc };
    submitPost(newPost);
    setLoading(false);
    trigger();
    setFile(null);
    setDesc("");
    setLoadingFile(false);
  };

  return (
    <Container>
      <Wrapper>
        <Top>
          <Image src={user.profilePicture } />
          <Input
            darkMode={darkMode}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={`What's in your mind ${user.username}?`}
          />
        </Top>
        <Hr darkMode={darkMode} />
        {file && !loadingFile && (
          <ImgCon>
            <Img src={URL.createObjectURL(file) || ""}></Img>
            <Cancel onClick={() => setFile(null)} />
          </ImgCon>
        )}
        {loadingFile && (
          <LoadingCon>
            <CircularProgress style={{margin:20, fontSize:45}}/>
          </LoadingCon>
          
        )}
        <Bottom onSubmit={submitHandler}>
          <Options>
            <PermMedia style={{ color: "blue" }} />
            <OptionTextVideo htmlFor="file">Photo </OptionTextVideo>
            <File
              type="file"
              id="file"
              accept=".png, .jpeg, .jpg"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Options>
          <Options>
            <Room style={{ color: "green" }} />
            <OptionText>Location</OptionText>
          </Options>
          <Options>
            <EmojiEmotions style={{ color: "goldenrod" }} />
            <OptionText>Feelings</OptionText>
          </Options>
          <Button disabled={loading}>Share</Button>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Share;
