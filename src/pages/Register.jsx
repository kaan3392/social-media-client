import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";

const color = "#383e42";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  @media only screen and (max-width: 395px) {
    width: 70%;
    height: 70%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Logo = styled.h3`
  font-size: 50px;
  font-weight: 800;
  color: ${color};
  margin-bottom: 10px;
`;
const Desc = styled.span`
  font-size: 24px;
  color: ${color};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;
const Box = styled.form`
  height: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    height: 350px;
  }
`;

const Input = styled.input`
  height: 50px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 18px;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${color};
  color: white;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    border: 1px solid ${color};
    color: ${color};
    background-color: white;
  }
`;
const Forgot = styled.span`
  text-align: center;
  color: ${color};
  cursor: pointer;
  text-decoration: underline;
`;

export const MessageContainer = styled.div`
  position: fixed;
  background-color: red;
  padding: 5px;
  border-radius: 5px;
  bottom: 0;
  right: 0;
  @media only screen and (max-width: 395px) {
    padding: 2px;
    font-size: 11px;
    border-radius: 2px;
  }
`;
export const Message = styled.span`
  color: white;
`;

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      document
        .getElementById("passwordAgain")
        .setCustomValidity("passwords don't match!");
    } else {
      const user = {
        username,
        email,
        password,
      };
      try {
        await publicRequest.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        setErrMsg(error.response.data.msg);
        setTimeout(() => {
          setErrMsg(null);
        }, 3000);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>Social.</Logo>
          <Desc>Join Us! Let's find our friends!</Desc>
        </Left>
        <Right>
          <Box onSubmit={handleClick}>
            <Input
              required
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              required
              id="password"
              type="password"
              minLength="6"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              required
              id="passwordAgain"
              type="password"
              minLength="6"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            <Button>Register</Button>
            <Link to="/login">
              <Forgot>Do you already have an account?</Forgot>
            </Link>
          </Box>
          {errMsg && (
            <MessageContainer>
              <Message>{errMsg}</Message>
            </MessageContainer>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Register;
