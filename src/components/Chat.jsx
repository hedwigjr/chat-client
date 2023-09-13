import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import io from 'socket.io-client'
import { URL_API } from '../config';

import styles from '../styles/Chat.module.css'
import { useRef } from 'react';
import Message from './Message';

const socket = io.connect(URL_API)

function Chat({user, room, currentRoom}) {

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    const [userRooms, setUserRooms] = useState([])
    const messagesEndRef = useRef(null)

    useEffect(()=> {
        socket.emit('join',{room})
        socket.emit('users:update')
        socket.emit('messages:update')
    }, [room])
    useEffect(() => {
        scrollToBottom()
      }, [messagesList]);
    

    useEffect(()=> {
        socket.on('messages:get', (messages)=>{
            setMessagesList(messages[room])
        })
        socket.on('users:get', ({usersList, roomsList})=>{
            setUsers(roomsList[room])
            setUserRooms(usersList[user])
          })
    })

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

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
                    <div className={styles.chatListTitle}>
                        <h4 className={styles.h4}>It's room: <b>{room}</b> </h4>
                    </div>
                    
                    <div className={styles.form}>
                        {!!messagesList && messagesList.map((message)=> <Message messageMeta={message} currentUser={user} key={nanoid()}/>)}
                        <div ref={messagesEndRef} />
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
