import React, { useEffect, useState } from 'react'
import UserRooms from './UserRooms'
import {useLocation } from 'react-router-dom';

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
  const [once, setOnce] = useState(false)

  useEffect(()=>{
    socket.emit('join', {user, room})
    socket.emit('users:add', {user, room})
    socket.emit('users:update')
  },[user, room])

  useEffect(()=>{
    if(once !== false) {setRoom(rooms[rooms.length-1])}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[once])

  
  
  
  socket.on('users:get', ({usersList})=>{
    
    if(rooms.filter(el => el!==null).length > 1 && once === false){
      setOnce(true)
    }
    
    setRooms(usersList[user].filter(el => el!==null))
})

  const addRoom = (newRoom) =>{
    socket.emit('users:add', {user: user, room: newRoom})
  }

  const currentRoom = (room)=>{
    setRoom(room)
  }

  return (
    <div className={styles.column}>
      <Header user={user} />
      <div className={['container', styles.flex_grow, styles.background].join(' ')}>
        <div className={['wrapper', styles.height].join(' ')}>
            <div className={styles.row}>
              <div className={styles.columnInside}>
                <CreateRoom user= {user} addRoom={addRoom} currentRoom={currentRoom}/>
                {rooms.filter(el => el!==null).length > 1 && <UserRooms user={user} rooms ={rooms} currentRoom={currentRoom}/>}
              </div>
              {room !== '' && <Chat user={user} room ={room} currentRoom={currentRoom} />}
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
