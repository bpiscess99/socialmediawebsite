import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"

  const { userid } = useParams();

  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [isFollow, setIsFollow] = useState(false);

  // follow user 

  const followUser = (userId) => {
    fetch("/api/users/follow",{
      method: "put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      })
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      setIsFollow(true)
    })
  }

  // unfollow User
  const unFollowUser = (userId) => {
    fetch("/api/users/unfollow",{
      method: "put",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId
      })
    })
    .then((res) => {
      res.json()
    })
    .then((data) => {
      console.log(data)
      setIsFollow(false)
    })
  }

  useEffect(() => {
    fetch(`/api/users/profile/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then(res => res.json())
      .then((result) => {
        // console.log(result)
        setUser(result.user)
        setPosts(result.post)
        if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id
        )
        ){
          setIsFollow(true)
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <div className="profile">
        {/* Profile Frame */}
        <div className="profile-frame">
          <div className="profile-pic">
            <img
              src= {user.Photo ? user.Photo : picLink}
              alt=""
            />
          </div>

          {/* Profile Data */}
          <div className="profile-data">
           
           <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
           <h1>{user.name} </h1>
           <button className="follow-btn" 
           onClick={() => {
            if(isFollow){
              unFollowUser(user._id)
            }else{
            followUser(user._id)}
          }
            }
           >
            {isFollow ? "unFollow" : "Follow"}
           </button>
           </div>
            
            <div className="profile-info" style={{ display: "flex" }}>
              <p>{posts.length} Posts</p>
              <p>{user.followers ? user.followers.length : "0"} Followers</p>
              <p>{user.following ? user.following.length : "0"} Following</p>
            </div>
          </div>
        </div>

        <hr style={{ width: "90%", margin: "25px auto", opacity: "0.8" }} />

        {/* Gallery */}
        <div className="gallery">
          {posts.map((post) => {
            return (
              <div key={post._id}>
                <img
                  src={post.photo}
                  alt="img"
                  //   onClick={() => toggleDetails(post)}
                  className="item"
                />
              </div>
            );
          })}
        </div>
        {/* {show && <PostDetail item={posts} toggleDetails={toggleDetails} />} */}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .profile {
    max-width: 600px;
    margin: 10px auto;

    .profile-frame {
      display: flex;
      justify-content: space-evenly;
    }

    .profile-pic {
      height: fit-content;
    }
    .profile-pic img {
      width: 160px;
      height: 160px;
      /* object-fit: contain; */
      border-radius: 100%;
    }

    .profile-data {
      text-align: left;

    .follow-btn{
      margin: auto 10px;
  cursor: pointer;
  font-weight: bolder;
  padding: 10px 20px;
  font-size: 0.8rem;
  border: none;
  color: white;
  background-color: #0115eb;
  border-radius: .7rem;
  transition: all 0.25s ease;
  &:hover{
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -10px #0115eb;
  }
}

    }  
    }

    .profile-info p {
      padding: 0 7px;
    }

    .gallery {
      display: flex;
      flex-wrap: wrap;
      text-align: center;

      img {
        width: 30%;
        margin: 10px;
      }
    }
  
`;
export default UserProfile;
