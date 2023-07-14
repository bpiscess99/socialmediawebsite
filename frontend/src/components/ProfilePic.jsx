  import React, { useEffect, useRef, useState } from 'react'
  import styled from 'styled-components'

  const ProfilePic = ({changeprofile}) => {
      
      // input field function
      const hiddenFileInput = useRef(null) // all website don't refer through useRef

      // cloudinary image 
      const [image, setImage] = useState("");
      const [url, setUrl] = useState("");

      // posting image in to cloudinary
    const postDetails = () => {
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
        console.log(url)
        
      };
      //  post image to db 
      const postPic = () => {
              fetch("/api/users/uploadprofilepic", {
              method: "put",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt")
          
                // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N…TYwfQ.fyDyFkLueyGdNCkddpAQCQWE6NgLVaqO0lVzWLXXCb8'
              },
              body: JSON.stringify({
              photo: url,
              })
              }).then(res => res.json())
              .then(data =>  {
                console.log(data)
                changeprofile();
                window.location.reload() // for reloading the page and update the picture
            })
              .catch(err => console.log(err));
              }
      


      // upload photo function
      const handleClick = () => {
          // current is syntax of useRef
      hiddenFileInput.current.click()
      };

      useEffect(() => {
          if(image){
              postDetails()
          } 
      }, [image])

      useEffect(() => {
      if(url){
          postPic()
      }  
      }, [url])

      return (
      <Container>
      <div className='profile-pic darkBg'>
          
          <div className="change-pic centered">
              
              <div>
              <h2>Change Profile Photo</h2>
              </div>

          <div style={{borderTop: "1px solid #00000030"}}>
              <button className="upload-btn" style={{color: "#1EA1F7", 
              padding: "15px 80px"}} 
              onClick={handleClick}>
                  Upload Photo</button>
          </div>
          
          <div>
          <input 
          type="file" 
          ref={hiddenFileInput} 
          accept='image/*' 
          style={{display: "none"}}
          onChange={(e) => {setImage(e.target.files[0])}}
          />
          </div>

          <div style={{borderTop: "1px solid #00000030"}}>
              <button className='upload-btn'
              onClick={() => {
                setUrl(null)
              postPic()
            }}
              style={{color: "#ED4956", 
              padding: "15px 80px"}}>
                {"  "}
                  Remove Current Photo </button>
          </div>

          <div style={{borderTop: "1px solid #00000030"}}>
              <button style={{background: "none", 
              border: "none", 
              cursor: "pointer", 
              fontSize: "15px", 
              padding: "15px 80px", }} 
              onClick={changeprofile}>
                  Cancel</button>
          </div>

          </div>
      </div>
              
      </Container>
    )
  }

  const Container = styled.div`

      background-color: rgba(65, 63, 63, 0.2);
      width: 100vw;
      height: 100vh;
      z-index: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      position: absolute;
      

    .change-pic{
      background-color: #fff;
      border-radius: 20%;
      /* height: 10rem;
      width: 20rem; */
      /* position: fixed;
      top: 50%;
      left: 48%;
      transform: translate(-50%,-50%) */

      .change-pic div{
      }
      }

    .upload-btn{ 
      cursor: pointer;
      background: none;
      border: none;
      font-weight: bolder;
      font-size: 15px;
    }

  `;
  export default ProfilePic
