import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Main from './Main'
import UserPage from './UserPage'
// import Chat from './Chat'
// import Test from './Test'

const AppRoutes = () => {
  return (
    <Routes>
       <Route path ="/" element={<Main />}/>
       <Route path ="/chat" element={<UserPage />}/>
       {/* <Route path ="/test" element={<Test/>}/> */}
    </Routes>
  )
}

export default AppRoutes
