import { WbSunny, Logout, Settings, Person, PropaneSharp } from "@mui/icons-material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { color } from "./Topbar";

const Container = styled.div`
  display: none;
  
  @media only screen and (max-width: 768px) {
  display: flex;
  width: 300px;
  right: ${props => props.hamburger ? "0px" : "-300px"};
  background-color: ${color};
  transition: all .5s ease;
  display: flex;
  position: fixed;
  z-index: 2;
  border-end-start-radius: 10px;
  }
  @media only screen and (max-width: 395px) {
  width: 200px;
  right: ${props => props.hamburger ? "0px" : "-200px"};
  display: flex;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 5px;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ItemLink = styled(Link)`
  padding: 15px 5px 5px 5px;
  border-left: 4px solid ${color};
  color: white;
  text-decoration: none;
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: gray;
    border-left: 4px solid blue;
  }
  &:first-child{
    margin-top: 10px;
  }
`;

const Item = styled.li`
  padding: 15px 5px 5px 5px;
  border-left: 4px solid ${color};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: gray;
    border-left: 4px solid blue;
  }
  &:last-child{
    margin-bottom: 15px;
  }
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

const Hamburger = () => {
  const { user, dispatch, hamburger } = useContext(AuthContext);
  let navigate = useNavigate();

  const userLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const changeTheme = () => {
      dispatch({type:"TOGGLE"});
      dispatch({type:"HAMBURGER_OFF"});
  }
  
  return (
    <Container hamburger={hamburger}>
      <List>
        <ItemLink onClick={() => dispatch({type: "HAMBURGER_OFF"})} to={`/profile/${user.username}`}>
          <Text>My Profile</Text>
          <Person />
        </ItemLink>
        <Item onClick={changeTheme}>
          <Text>Change Theme</Text>
          <WbSunny />
        </Item>
        <ItemLink onClick={() => dispatch({type: "HAMBURGER_OFF"})} to="/setting">
          <Text>Update your Profile</Text>
          <Settings />
        </ItemLink>
        <Item  onClick={userLogout}>
          <Text>Logout</Text>
          <Logout />
        </Item>
      </List>
    </Container>
  );
};

export default Hamburger;
