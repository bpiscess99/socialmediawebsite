import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";


const Profile = () => {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState("");

  // show and hide comments
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  // change profile pic
  const changeprofile = () => {
    if(changePic){
      setChangePic(false)
    }else{
      setChangePic(true)
    }
  }

  useEffect(() => {
    fetch(`/api/users/profile/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        setPic(result.post)
        setUser(result.user)
        // console.log(pic)
      })
       }, []);
  return (
    <Container>
      <div className="profile">
        {/* Profile Frame */}
        <div className="profile-frame">
          <div className="profile-pic">
            <img onClick={changeprofile}
              src= {user.Photo ? user.Photo : picLink}
              alt="" 
            />
          </div>

          {/* Profile Data */}
          <div className="profile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name} </h1>

            <div className="profile-info" style={{ display: "flex" }}>
              <p>{pic ? pic.length : "0"} Posts</p>
              <p>{user.followers ? user.followers.length : "0"} Followers</p>
              <p>{user.following ? user.following.length : "0"} Following</p>
            </div>
          </div>
        </div>

        <hr style={{ width: "90%", margin: "25px auto", opacity: "0.8" }} />

        {/* Gallery */}
        <div className="gallery">
          {pic.map((post) => {
            return (
              <div key={post._id}>
                <img
                  src={post.photo}
                  alt="img"
                  onClick={() => toggleDetails(post)}
                  className="item"
                />
              </div>
            );
          })}
        </div>
        {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}
        {changePic && <ProfilePic changeprofile={changeprofile}/>}
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
  }
`;
export default Profile;
