import React, { useEffect, useState } from 'react'
import UserRooms from './components/UserRooms'

import '../../styles/style.css'
import styles from './styles/ChatPage.module.css'


import io from 'socket.io-client'
import { URL_API } from '../../config';
import CreateRoom from './components/CreateRoom';
import Chat from './components/Chat';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector } from 'react-redux';
import { useAutorise } from '../../hooks/useAutorise';

const socket = io.connect(URL_API)


export default function ChatPage() {

  const user = useSelector((state)=> state.user.login)

  useAutorise()

  const [rooms, setRooms] = useState([])
  const [room, setRoom] = useState('')
  const [once, setOnce] = useState(false)
  const [toggle, setToggle] = useState('hide')

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
  
  function handlerChangeClass () {
    if (window.innerWidth<750) {
      if(toggle === 'hide'){
        setToggle('open')
        if(!!document.getElementById("columnInside")) document.getElementById("columnInside").style.display = 'flex';

    } else {
        setToggle('hide')
        if(!!document.getElementById("columnInside")) document.getElementById("columnInside").style.display = 'none';
    }
    }
      
  }

  return (
    <div className={styles.column}>
      <Header/>
      <div className={['container', styles.flex_grow, styles.background].join(' ')}>
        <div className={['wrapper', styles.height].join(' ')}>
            <div className={styles.row}>
              <div className={styles.burgerMenu} onClick={handlerChangeClass}></div>
              <div className={styles.columnInside} id='columnInside'>
                <CreateRoom user= {user} addRoom={addRoom} currentRoom={currentRoom} handlerChangeClass={handlerChangeClass}/>
                {rooms.filter(el => el!==null).length > 1 && <UserRooms currentRoom ={room} rooms ={rooms} setCurrentRoom={currentRoom} handlerChangeClass={handlerChangeClass}/>}
              </div>
              {room !== '' && toggle === 'hide' && <Chat user={user} room ={room} currentRoom={currentRoom} />}
            </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
