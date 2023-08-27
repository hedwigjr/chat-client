import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000/')

export default function UserRooms(username) {
    const [rooms, setRooms] = useState([])
    useEffect(()=>{
            socket.emit('user:add', {name: username.username, room:'default'})
            socket.on('user_room_list:update', (rooms)=>{
            if(rooms[username.username] !== undefined){
                setRooms(rooms[username.username])
            }
        })
    },[])
  return (
    <div>
        {rooms.map((room, i)=> (
        <Link key={i} to={`/chat?name=${username}&room=${room}`} >
                    <button type='submit'>
                        {`Комната : ${room}`}
                    </button>
        </Link>))}
    </div>
  )
}
