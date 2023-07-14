import React, { useEffect, useState } from "react";
import styled from "styled-components";
import pic from "../img/pic.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyFollowingPost = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [item, setItem] = useState([]);


  // const notifyA = (msg) => toast.error(msg) // for error this function will run 
  const notifyB = (msg) => toast.success(msg)

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup");
    }

    // fetching my following posts
    fetch("/api/createpost/followingpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result)
        setData(result);
      })
      .catch((err) => console.log(err));
  }, [data]);

  // show and hide comments function
  const toggleComment = (posts) => {
    if(showComment){
      setShowComment(false)
    }else{
      setShowComment(true)
      setItem(posts)
    }
  }


  // like Api fetching &  id means like post user id
  const likePost = (id) => {
    fetch("/api/createpost/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id, // user id which we mention in paramter and postId should same as we we wrote in backend api
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  // unlike Api fetching & id means like post user id
  const unLikePost = (id) => {
    fetch("/api/createpost/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id, // user id which we mention in paramter and postId should same as we we wrote in backend api
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  // comment api fetching here
  const makeComment = (text, id) => {
    fetch("/api/createpost/comment", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("")
        notifyB("Comment Posted")
        console.log(result);
      });
  };

  return (
    <Container>
      <div className="home">
        {/* card */}
        {data.map((posts) => {
          return (
            <div className="card" key={posts._id}>
              {/* card header */}
              <div className="card-header">
                <div className="card-pic">
                  <img src={pic} alt="img" />
                </div>

                <h5>
                  <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                  </Link>
                  </h5>
              </div>

              {/* Card Image  */}
              <div className="card-image">
                <img src={posts.photo} alt="" />
              </div>

              {/* Card Content */}
              <div className="card-content">
                {posts.likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                ) ? (
                  <span
                    className="material-symbols-outlined material-symbols-outlined-red"
                    onClick={() => {
                      unLikePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined "
                    onClick={() => {
                      likePost(posts._id);
                    }}
                  >
                    favorite
                  </span>
                )}

                <p>{posts.likes.length} Likes</p>
                <p>{posts.body}</p>
                <p style={{fontWeight: "bolder", cursor: "pointer"}} onClick={() => {toggleComment(posts)}}>View all comments</p>
              </div>

              {/* add comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, posts._id);
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          );
        })}

        {/* show comments */}
        
        { showComment && (
        <div className="show-comment">
        <div className="container">
          <div className="post-pic">
            <img
              src={item.photo}
              alt=""
            />
          </div>
          <div className="details">
            {/* card-header */}
            <div
              className="card-header"
              style={{ borderBottom: "1px solid #00000029" }}
            >
              <div className="card-pic">
                <img src={pic} alt="img" />
              </div>

              <h5>{item.postedBy.name}</h5>
            </div>

            {/* comment section */}
            <div
              className="comment-section"
              style={{ borderBottom: "1px solid #00000029" }}
            >
              {
                item.comments.map((comment) => {
                  return(
                    <p className="comm" key={comment._id}>
                <span className="commenter" style={{ fontWeight: "bolder" }}>
                  {comment.postedBy.name}{" "}
                </span>
                <span className="comment-text">{comment.comment}</span>
              </p>
                  )
                })
              }

              
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
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => {makeComment(comment, item._id)
                toggleComment()}}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        <div className="close-comment">
          <span className="material-symbols-outlined material-symbols-outlined-comment" onClick={() => {toggleComment()}}>close</span>
        </div>
      </div>  
      )}
        
      </div>
    </Container>
  );
};

const Container = styled.div`
  .card {
    max-width: 31.2rem;
    height: max-content;
    margin: 25px 400px;
    border: 1px solid rgb(173, 173, 173);
    border-radius: 0.8rem;

    .card-header {
      display: flex;

      .card-header > h5 {
        margin: 0;
        padding: 11px;
      }
      a{
        list-style: none;
        text-decoration: none;
        color: black;
      }

      .card-pic img {
        width: 50px;
        border-radius: 100%;
        height: auto;
        object-fit: contain;
        padding: 7px;
      }
    }

    .card-image img {
      width: 100%;
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
  }

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
        width: 100%;
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

export default MyFollowingPost;
