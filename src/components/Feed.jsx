import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import Post from "./Post";
import Share from "./Share";
import { AuthContext } from "../context/AuthContext";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
flex:12;
@media only screen and (max-width: 395px) {
    flex: 10;
  }
`;

const Wrapper = styled.div`
padding: 20px;
@media only screen and (max-width: 395px) {
    padding:10px 0px 5px 10px;
  }
`;

const Feed = ({ username, home}) => {
  const [post, setPost] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      const res = username ?
        await publicRequest.get("/posts/profile/" + username) :
        await publicRequest.get("/posts/timeline/" + user._id);
      setPost(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
      );
    };
    getPosts();
  }, [username, user._id, trigger]);

  return (
    <Container >
      <Wrapper>
        {(user.username === username || home) && <Share trigger={()=> setTrigger(!trigger)}/>}
        {post.map((p, i) => (
          <Post post={p} key={i}  />
        ))}
      </Wrapper>
    </Container>
  )
};

export default Feed;