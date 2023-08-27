import React, { useEffect } from 'react'
import UserRooms from './UserRooms'
import { useLocation } from 'react-router-dom';

import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000/')


export default function UserPage() {
  const {search} = useLocation();
  const user = search.match(/=.+\b/).toString().substring(1)

  useEffect(()=> {
    }, [])


  return (
    <div>
      <UserRooms username= {user}/>
    </div>
  )
}
