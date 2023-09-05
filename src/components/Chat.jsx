import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import { URL_API } from '../config';

import styles from '../styles/Chat.module.css'

const socket = io.connect(URL_API)



function Chat({user, room, currentRoom}) {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([{user:'', message: ''}]);


    useEffect(()=> {
        socket.emit('join', {user, room})
        socket.emit('messages_list:get', {user, room})
        socket.emit('users:get')
    }, [room])

    useEffect(()=>{
        socket.on('user_list:update', (users)=>{
            setUsers(users)
        })
        socket.on('messages_list:update', (messages)=>{
            setMessagesList(messages)
        })
        socket.on('user_list:update', (rooms)=>{
            if(rooms[room] !== undefined){
                setUsers(rooms[room])
            }
          })
    })

    function leaveRoom() {
        socket.emit('user:disconnect',  {user, room})
        currentRoom('')
    }


    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!message) return;
        socket.emit('message:add', {user,room, message})
        setMessage('')
      }


  return (
            <div className={styles.wrapper}>
                <div className={styles.chatList}>
                    <div className={styles.form}>
                        {messagesList.map((item, i)=> (<span key={i} className={styles.span} > <b>{item.user}</b>: {item.message}<br/></span>))}
                    </div>
                    <form onSubmit={onSubmit} >
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
                    <button onClick={leaveRoom}>Leave this room🤢</button>
                </div>

            </div>
        )
}

export default Chat
