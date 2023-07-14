import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SignUp = () => {
    const navigate = useNavigate()    

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")

    // Toast functions
    const notifyA = (msg) => toast.error(msg) // for error this function will run 
    const notifyB = (msg) => toast.success(msg) // for success this function will run

    const postData = () => {
        // send data to server
        fetch('/api/users/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                name: name,
                userName: userName,
                email: email,
                password: password
            })    
        }).then(res => res.json())
          .then(data => {
            if(data.message){
                notifyA(data.message)
            }else{
                notifyB("email registered Successfully")
                navigate("/signin")
            }
            console.log(data)
        })
    }
    
    return (
    <Container className='hello'>
      <div className='signUp'>
        <div className="formContainer">
            <div className="form">
            <img className='signUpLogo' src={logo} alt="logo" />
            <p className="loginPara" >
                Sign up to see photos and videos <br /> from your friends
            </p>
            <div>
                <input type="email" name='email' id='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input type="text" name='name' id='name' value={name} placeholder='Full Name' onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <input type="text" name='username' id='username' value={userName} placeholder='Username' onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
                <input type="password" name='password' id='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <p className='loginPara' style={{fontSize:"14px", margin:"3px 0px"}}>
                By signing up, you agree to out Terms, <br /> privacy policy and cookie policy.
            </p>
            <input type="submit" id='submit-btn' value="Sign Up" onClick={() => {postData()}} />
            </div>
            <div className="form2">
                Already have an account ?
                <Link to="/signin">
                <span style={{color: "blue", cursor: "pointer"}}>Sign In</span>
                </Link>
                
            </div>
        </div>
      </div>
    </Container>
  )
}


const Container = styled.div`
    
        background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFfHm6VcBgzEy4GS1pdr56GrRfqB65dv73HQ&usqp=CAU");
        background-size: cover;    // it will cover the whole background with photo
        
        .formContainer{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 90vh;
            width: 100vw;
           
        .form{
            background-color: aliceblue;
            border: 1px solid black;
            border-radius: .5rem;
            padding: 35px 0px;
            padding-bottom: 10px;
            padding-top: 5px;
              
        .signUpLogo{
            width: 30%;
            height: 30%;
            object-fit: contain;           
        }
        .loginPara{
            color: rgba(var(--f52,142,142,142),1);
            font-size: 17px;
            font-weight: 600;
            line-height: 20px;
            margin: 0px 40px 20px 40px;
        }
        input{
            padding: 5px ;
            margin: 3px 0;
            border-radius: .3rem;
            outline: none;
            border: 1px solid rgba(var(--f52,142,142,142),1);
            font-size: 16px;
            width: 70%;
            box-sizing: border-box; // the input field will not exceed from box 
        }
        #submit-btn{
            background-color: #1773EA;
            color: white;
            font-weight: bold;
            padding: 5px 10px;
            cursor: pointer;
        }
        
    }

    .form2{
        background-color: palegreen;
        padding: 20px 56px;
        margin-top: 5px;
        border: 1px solid black;
        border-radius: .5rem;
    }
        }
        
`;
export default SignUp
