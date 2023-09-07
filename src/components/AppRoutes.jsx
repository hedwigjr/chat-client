import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Main from './Main'
import UserPage from './UserPage'


const AppRoutes = () => {
  return (
    <Routes>
       <Route path ="/" element={<Main />}/>
       <Route path ="/chat" element={<UserPage />}/>
    </Routes>
  )
}

export default AppRoutes
