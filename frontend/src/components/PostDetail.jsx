import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostDetail = ({ item, toggleDetails }) => {

  const notifyB = (msg) => toast.success(msg)

   
  const navigate = useNavigate()
  const removePost = (postId) => {
    if(window.confirm("Do you really want to delete this post ?")){
      fetch(`/api/createpost/delete/${postId}`,{
        method: "delete",
        headers:{
           Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      }).then((res) => res.json())
      .then((result) => {
        console.log(result)
        toggleDetails()
        navigate("/")
        notifyB(result.message)
      }).catch(err => console.log(err))
    }
      
  }
  return (
    <Container>
      <div className="show-comment">
        <div className="container">
          <div className="post-pic">
            <img src={item.photo} alt="" />
          </div>
          <div className="details">
            {/* card-header */}
            <div
              className="card-header"
              style={{ borderBottom: "1px solid #00000029" }}
            >
              <div className="card-pic">
                <img src={item.photo} alt="img" />
              </div>

              <h5>{item.postedBy.name}</h5>
              <div className="delete-post">
                <span className="material-symbols-outlined" 
                onClick={() => {removePost(item._id)} }
                >delete</span>
              </div>
            </div>

            {/* comment section */}
            <div
              className="comment-section"
              style={{ borderBottom: "1px solid #00000029" }}
            >
              {item.comments.map((comment) => {
                return (
                  <p className="comm" key={comment._id}>
                    <span
                      className="commenter"
                      style={{ fontWeight: "bolder" }}
                    >
                      {comment.postedBy.name}{" "}
                    </span>
                    <span className="comment-text">{comment.comment}</span>
                  </p>
                );
              })}
            </div>

            {/* Card Content */}
            <div className="card-content">
              <p>{item.likes.length} Likes</p>
              <p>{item.body}</p>
            </div>

            {/* add comment */}
            <div className="add-comment">
              <span className="material-symbols-outlined">mood</span>
              <input
                type="text"
                placeholder="Add a comment"
                // value={comment}
                // onChange={(e) => {
                //   setComment(e.target.value);
                // }}
              />
              <button
                className="comment"
                // onClick={() => {makeComment(comment, item._id)
                // toggleComment()}}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        <div className="close-comment">
          <span
            className="material-symbols-outlined material-symbols-outlined-comment"
            onClick={() => {
              toggleDetails();
            }}
          >
            close
          </span>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* show comment styling */
  .show-comment {
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(16, 13, 13, 0.4);
    /* display: none; */

    .container {
      display: flex;
      width: 80%;
      background-color: #fff;
      position: absolute;
      top: 10%;
      left: 10%;
      height: 500px;
    }

    .post-pic {
      background-color: black;
      display: flex;
      align-items: center;
      width: 100%;

      img {
        object-fit: contain;
        width: 41vw;
        height: 60vh;
      }
    }

    .details {
      width: 100%;
      height: inherit; // it means the height would be same as his parent div
      display: flex;
      flex-direction: column;
    }

    .card-header {
      display: flex;
      background-color: #fff;
      width: 100%;

      .card-header > h5 {
        margin: 0;
        padding: 11px;
        background-color: white;
      }

      .card-pic img {
        width: 50px;
        border-radius: 100%;
        height: auto;
        object-fit: contain;
        padding: 7px;
      }

      .delete-post{
        position: absolute;
        top: 2%;
        right: 1%;
        cursor: pointer;
      }
    }

    .comment-section {
      flex-grow: 4; // it will create the space in column base
      text-align: left;
      margin-left: 10px;
    }

    .card-content {
      text-align: left;
      line-height: 4px;
      padding: 3px 10px;
      border-bottom: 1px solid rgb(173, 173, 173);

      .material-symbols-outlined {
        cursor: pointer;
      }

      .material-symbols-outlined-red {
        color: red;
        font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 48;
      }
    }

    .add-comment {
      display: flex;
      align-items: center;

      input {
        width: 100%;
        border: none;
        padding: 10px;
      }

      .comment {
        border: none;
        background: none;
        font-weight: bolder;
        color: #4292c7;
        cursor: pointer;
      }
    }

    .close-comment {
      position: fixed;
      top: 1%;
      right: 5%;
      color: white;
      border: none;
      cursor: pointer;

      .material-symbols-outlined-comment {
        font-size: 50px;
        font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 0, "opsz" 48;
      }
    }
  }
`;

export default PostDetail;
