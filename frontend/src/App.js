import'./App.css';
import React, {useState} from 'react'
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './screens/Home';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'; // it shows the error on frontend to the user and if we add this in app.js then we don't need to mention in each file
import CreatePost from './screens/CreatePost';
import {LoginContext} from "./context/LoginContext"
import Modal from './components/Modal';
import Profile from './screens/Profile';
import UserProfile from './components/UserProfile';
import MyFollowingPost from './screens/MyFollowingPost';

function App() {
  const [userLogin, setUserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin, setModalOpen}}>
      <Navbar login={userLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/signup' element={<SignUp/>}/> 
      <Route path='/signin' element={<SignIn/>}/> 
      <Route exact path='/profile' element={<Profile/>}/> 
      <Route path='/createpost' element={<CreatePost/>}/> 
      <Route path='/profile/:userid' element={<UserProfile/>}/> 
      <Route path='/followingpost' element={<MyFollowingPost/>}/> 
    </Routes>
    <ToastContainer theme='dark'/>
    {modalOpen && <Modal setModalOpen={setModalOpen}/>}
      </LoginContext.Provider>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
