import styled from "styled-components";
import { useContext, useState } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Message, MessageContainer } from "./Register";

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
    width: 40%;
    height: 60%;
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
  align-items: center;
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
`;
const Box = styled.form`
  height: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  @media only screen and (max-width: 768px) {
    height: 350px;
  }
  @media only screen and (max-width: 395px) {
    height: 250px;
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
  @media only screen and (max-width: 395px) {
    height: 45px;
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
  &:disabled {
    cursor: not-allowed;
  }
  @media only screen and (max-width: 395px) {
    height: 45px;
  }
`;
const Forgot = styled.span`
  text-align: center;
  color: ${color};
  cursor: pointer;
  text-decoration: underline;
`;
const Register = styled.button`
  height: 50px;
  width: 100%;
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
  @media only screen and (max-width: 395px) {
    height: 45px;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch, error } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
    if(error){
      console.log(error.response.data)
      setErrMsg(error.response.data);
        setTimeout(() => {
          setErrMsg(null);
        }, 3000);
      setEmail("")
      setPassword("")
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
          <Box onSubmit={handleSubmit}>
            <Input
              autoComplete="username"
              placeholder="Email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              autoComplete="current-password"
              placeholder="Password"
              minLength="6"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button disabled={isFetching}>Login</Button>
            <Forgot>Forgot Password?</Forgot>
            <Link to="/register">
              <Register>Create a new account</Register>
            </Link>
          </Box>
          {errMsg && (
            <MessageContainer >
              <Message>{errMsg}</Message>
            </MessageContainer>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Login;
