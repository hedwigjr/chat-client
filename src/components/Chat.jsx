import React, { useEffect, useState } from 'react'

import io from 'socket.io-client'
import { URL_API } from '../config';

import styles from '../styles/Chat.module.css'

const socket = io.connect(URL_API)

function Chat({user, room, currentRoom}) {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    const [userRooms, setUserRooms] = useState([])

    useEffect(()=> {
        socket.emit('join',{room})
    }, [])

    useEffect(()=> {
        socket.emit('join',{room})
        socket.emit('users:update')
        socket.emit('messages:update')
    }, [room])

    useEffect(()=> {
        socket.on('messages:get', (messages)=>{
            setMessagesList(messages[room])
        })
        socket.on('users:get', ({usersList, roomsList})=>{
            setUsers(roomsList[room])
            setUserRooms(usersList[user])
          })
    })



    function leaveRoom() {
        socket.emit('users:disconnect',{user, room})
        const choose = (room)=>{
            if (userRooms[1] !== room){
                return userRooms[1]
            } else {
                if (!userRooms[2]) return ''
                return userRooms[2]
            }
        }
        currentRoom(choose(room))
    }


    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!message) return;
        socket.emit('messages:add', {user, room, message})
        setMessage('')
      }

  return (
            <div className={styles.wrapper}>
                <div className={styles.chatList}>
                    <div className={styles.form}>
                        {messagesList.map((item, i)=> (<span key={i} className={styles.span} > <b>{item.user}</b>: {item.message}<br/></span>))}
                    </div>
                    <form onSubmit={onSubmit} className={styles.bb}>
                        <input
                            type="text"
                            name="message"
                            id ="inputChatText"
                            className={styles.inputChatText}
                            placeholder='Type your text...'
                            onChange={onChange}
                            value={message}
                            required/>
                    </form>
                </div>
                <div className={styles.metaList}>
                    <div className={styles.metaWrapper}>
                        <h4 className={styles.h4}>It's room: {room}</h4>
                        <div className={styles.chatters} >
                            <p>Current chatters:</p>
                            {Array.isArray(users) && users.map((user, i)=> (<span key={i}> {user} <br/></span>))}
                        </div>
                    </div>
                    <button onClick={leaveRoom} className={styles.btn}>Leave this room🤢</button>
                </div>

            </div>
        )
}

export default Chat
