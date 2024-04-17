import React from 'react'
import {Routes , Route } from "react-router-dom";

import LoginPage from '../UserAuth/LoginPage'
import RegisterPage from '../UserAuth/RegisterPage';
import Home from '../Home/Home';
import TagsList from '../ChatBot/TagsList';
import ChatList from '../ChatBot/ChatList';
import ChatHistory from '../ChatBot/ChatHistory';
import HomeAfterLogin from '../Home/HomeAfterLogin';
import StartChat from '../ChatBot/StartChat';
import UpdateInfo from '../UserInfo/UpdateInfo';
import ChangePassword from '../UserInfo/ChangePassword';
import DeleteAccount from '../UserInfo/DeleteAccount';
import PageNotFound from '../PageNotFound/PageNotFound';
import GetAllUsers from '../AdminPage/GetAllUsers';
import UpdateToAdmin from '../AdminPage/UpdateToAdmin';

const Router = () => {

  let token = localStorage.getItem("user-token");
  console.log("Token in Router.js--", token);

  return (
    <div>

    
      {
        !token ? 
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>   

        :

        <Routes>
            <Route path='/tagsList' element={<TagsList/>}/>
            <Route path='/chatList' element={<ChatList/>}/>
            <Route path='/chatHistory/:tagId' element={<ChatHistory/>}/>
            <Route path='/homeAfterLogin' element={<HomeAfterLogin/>}/>
            <Route path='/startChat' element={<StartChat/>}/>

            <Route path='/UserInfo' element={<UpdateInfo/>}/>
            <Route path='/ChangePassword' element={<ChangePassword/>}/>
            <Route path='/DeleteAccount' element={<DeleteAccount/>}/>

            <Route path='/GetAllUsersAdmin' element={<GetAllUsers/>}/>
            <Route path='/UpdateToAdmin/:id' element={<UpdateToAdmin/>}/>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      }
        
            

            

            
        
    </div>
  )
}

export default Router