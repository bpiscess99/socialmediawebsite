import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {LoginContext} from '../context/LoginContext'

const SignIn = () => {
  const {setUserLogin} = useContext(LoginContext)
   
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
       
  // Toast functions
  const notifyA = (msg) => toast.error(msg) // for error this function will run 
  const notifyB = (msg) => toast.success(msg) // for success this function will run

  const postData = () => {
   
    fetch("/api/users/signin", {
      method: "post",
      headers: {
      "Content-Type": "application/json", // must be write this instead of mention in insomnia
    },
    // stringify means which data we are sending first convert into json
    body: JSON.stringify({
      email: email,
      password: password
    })

  }).then(res => res.json())
  .then(data => {
    if(data.message){
       notifyA(data.message)
    }else{
      notifyB("Sign In successfully")
      console.log(data)
      localStorage.setItem("jwt", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      setUserLogin(true)
      navigate("/")
    }

  })
  }
  return (
    <Container>
      <div className="signIn">
        <div className="loginForm">
          <img src={logo} alt="logo"/>
          <div>
            <input type="email" name='email' id='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div> 
            <input type="password" name='password' id='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <input type="submit" id='login-btn' value="Sign In" onClick={postData} style={{color: "white", backgroundColor: "#1773EA", padding: "10px 60px"}} />
        </div>
        <div className='loginForm2'>
          Don't have an account ?
          <Link to="/signup">
          <span style={{color: "blue", cursor: "pointer"}}>Sign Up</span> 
          </Link>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
    
        
    .signIn{
      background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkk5AzFyQEeM77p0k7o9XMmeuLhdIX1f6jQA&usqp=CAU");
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 95vh;
      width: 100vw;
     
      .loginForm{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #ffffff9c;
      border-radius: 2rem;
      width: 20rem;
      height: 20rem;
      
      
    img{
      width: 30%;
      height: 10%;
      margin-top: .5rem;
    }

    input{
      padding: 10px 20px;
      margin: 10px;
      border-radius: .5rem;
      border: 1px solid gray;
      
    }
  }
  
  .loginForm2{
      background-color: yellowgreen;
      margin: .6rem;
      padding: .8rem 20px;
      border-radius: 5rem;
  }
  } 
`

export default SignIn
