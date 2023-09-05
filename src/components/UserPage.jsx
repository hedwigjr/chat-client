import React, { useEffect, useState } from 'react'
import UserRooms from './UserRooms'
import { Link, useLocation } from 'react-router-dom';

import '../styles/style.css'
import styles from '../styles/UserPage.module.css'


import io from 'socket.io-client'
import { URL_API } from '../config';
import CreateRoom from './CreateRoom';
import Chat from './Chat';
import Header from './Header';
import Footer from './Footer';

const socket = io.connect(URL_API)


export default function UserPage() {
  const {search} = useLocation();
  const user = search.match(/=.+\b/).toString().substring(1)

  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState('')

  useEffect(()=>{
          socket.emit('user:add', {user: user, room:''})
  },[])
  useEffect(()=>{
    socket.on('user_room_list:update', (rooms)=>{
      if(rooms[user] !== undefined){
          setRooms(rooms[user])
      }
    })
  })
  useEffect(()=>{
    socket.emit('users:get')
  },[room])

  const addRoom = (newRoom) =>{
      socket.emit('user:add', {user: user, room: newRoom})
  }

  const currentRoom = (chat)=>{
    setRoom(chat)
  }


  return (
    <div className={styles.column}>
      <Header user={user} />
        <div className={styles.row}>
          <div className={styles.columnInside}>
            <CreateRoom user= {user} addRoom={addRoom} currentRoom={currentRoom}/>
            <UserRooms user={user} rooms ={rooms} currentRoom={currentRoom}/>
          </div>

          {room != '' && <Chat user={user} room ={room} currentRoom={currentRoom}/>}
        </div>

      <Footer />
    </div>
  )
}
