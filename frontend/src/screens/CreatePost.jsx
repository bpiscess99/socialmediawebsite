import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'



const CreatePost = () => {
  // var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
   
  const [userName, setUserName] = useState("");
  // const [userPhoto, setUserPhoto] = useState("");
  // body we will get from database
  const [body, setBody] = useState("");
  // images we will get through cloudinary
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate()
  

  // Toast functions
  const notifyA = (msg) => toast.error(msg) // for error this function will run 
  const notifyB = (msg) => toast.success(msg) // for success this function will run

  useEffect(() => {
    if(url){
   // saving post to mongodb
   fetch("/api/createpost/createpost", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("jwt")

      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N…TYwfQ.fyDyFkLueyGdNCkddpAQCQWE6NgLVaqO0lVzWLXXCb8'
    },
    body: JSON.stringify({
      body,
      photo: url
    })
  }).then(res => res.json())
    .then(data =>  {
      if(data.message){
      notifyA(data.message) 
    }
    else{
      notifyB("Successfully posted")
      navigate("/")
    }
  })
    .catch(err => console.log(err));
    }
     
  }, [url])
    

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUserName(loggedInUser.name);
      // setUserPhoto(loggedInUser.Photo);
    }
  }, []);


  // posting image in to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    // this will come from upload presets where we set our name insta-clone
    data.append("upload_preset", "instaclone123");
    //this will come from cloudinary where we set name as umair dev
    data.append("cloud_name", "umairdev");
    // this url copy from cloudinary docs then go to upload API
    fetch("https://api.cloudinary.com/v1_1/umairdev/image/upload", {
      method: "post",
      body: data,
    })
      .then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err));

    
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <Container>
      <div className="createPost">
        {/* Header */}
        <div className="post-header">
          <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
          <button id="post-btn" onClick={postDetails}>
            Share
          </button>
        </div>

        {/* Image Preview */}
        <div className="main-div">
          <img
            id="output"
            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
            alt=""
          />
          <input
            type="file"
            accept="image/*"
            // [0] means there should be return array 1st element
            onChange={(event) => {
              loadfile(event);
              setImage(event.target.files[0]);
            }}
          />
        </div>

        {/* Details */}
        <div className="details">
          <div className="post-header">
            <div className="card-pic">
              {/* <img 
              src={userPhoto ? userPhoto : picLink} 
              alt="" /> */}
            </div>
            <h5>{userName}</h5>
          </div>

          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            type="text"
            placeholder="write a caption..."
          ></textarea>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .createPost {
    max-width: 500px;
    border: 1px solid rgb(173, 173, 173);
    margin: 10px auto;
    border-radius: 5px;

    .details {
      border-top: 1px solid rgb(173, 173, 173);
    }

    .post-header {
      display: flex;

      #post-btn {
        border: none;
        color: #339ce3;
        background: none;
        font-weight: bolder;
        cursor: pointer;
      }
    }

    .main-div {
      border-top: 1px solid rgb(173, 173, 173);

      #output {
        width: 350px;
        border: none;
      }

      input {
        padding: 5px;
        left: 2px;
      }
    }

    .card-pic img {
      width: 60px;
      border-radius: 100%;
      margin: 0.5rem auto;
    }

    h5 {
      margin: 30px 16px;
      color: #020224;
    }

    textarea {
      width: 90%;
      border: none;
      outline: none;
    }
  }
`;
export default CreatePost;
