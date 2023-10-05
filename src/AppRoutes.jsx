import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage'
import UserPage from './pages/UserPage/UserPage'
import ChatPage from './pages/ChatPage/ChatPage'


const AppRoutes = () => {
  return (
    <Routes>
       <Route path ="/" element={<AuthorizationPage />}/>
       <Route path ="/chat" element={<ChatPage />}/>
       <Route path ="/user" element={<UserPage />}/>
    </Routes>
  )
}

export default AppRoutes
