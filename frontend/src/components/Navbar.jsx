import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../img/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {LoginContext} from '../context/LoginContext'
import SearchBar from './SearchBar';

const Navbar = ({login}) => {
  const navigate = useNavigate()
  const {setModalOpen} = useContext(LoginContext)
  const loginStatus = () => {
    
    const token = localStorage.getItem("jwt")
    if(login || token){
    return [
      <React.Fragment key="profile">
        <div className='search'>
          <SearchBar/>
        </div>
      <Link to="/profile"><li style={{color: "black"}}>Profile</li></Link>     
      <Link to="/createpost"><li style={{color: "black"}}>Create Post</li></Link>
      <Link to="/followingpost"><li style={{color: "green"}}>My Following</li></Link>
      <Link to={""}>
        <button className='primaryBtn' onClick={() => setModalOpen(true)}>Log Out</button>
      </Link>
      
      </React.Fragment>
    ]
    }else {
      return [
        <>
        <Link to="signup"><li style={{color: "gray"}}>SignUp</li></Link>  
      <Link to="signin"><li style={{color: "orangered"}}>SignIn</li></Link>
        </>
      ]
    }    
  }
  return (
    <Container >
      
      <div className='navbar'>
      <img src={logo} alt="logo" onClick={() => {navigate("/")}} />
      <ul className='nav-menu'>
        {loginStatus()}     
      </ul>
      </div>

    </Container>
  )
}


const Container = styled.div`
.navbar{
  display: flex;
  justify-content: space-around;
  box-shadow: 1px 1px 5px #e0dcdc;
}

img{
    width: 5%;
    object-fit: contain;    
}

.primaryBtn{
  cursor: pointer;
  font-weight: bolder;
  padding: 10px 20px;
  font-size: 0.8rem;
  border: none;
  color: white;
  background-color: #db183c;
  border-radius: .7rem;
  transition: all 0.25s ease;
  &:hover{
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -10px rgba(219, 24, 44 ,0.6);
  }
}

ul{
  display: flex;
  align-items: baseline;
}

li{
  list-style: none;
  padding: 1px 15px;
} 

a{
  text-decoration: none;
  color: black;
  font-size: 18px;
}

`;

export default Navbar;

