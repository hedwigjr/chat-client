import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'


const socket = io.connect('http://localhost:5000/')

const FIELDS = {
    USERNAME: "username",
    ROOM: "room"
}

function Chat() {
    const {USERNAME, ROOM} = FIELDS;

    const {search} = useLocation();
    const [params, setParams] = useState({
        [USERNAME]: "",
        [ROOM]: ""
    })
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messagesList, setMessagesList] = useState([{user:'', message: ''}]);
    const navigate = useNavigate();

    const searchParams = Object.fromEntries(new URLSearchParams(search))

    useEffect(()=> {
        setParams(searchParams)
        socket.emit('join', searchParams)
        socket.emit('user:add', searchParams)
        socket.emit('messages_list:get', searchParams)
    }, [search])

    useEffect(()=>{
        socket.on('user_list:update', (users)=>{
            setUsers(users)
        })
        socket.on('messages_list:update', (messages)=>{
            setMessagesList(messages)
        })
    },[])
    console.log(messagesList)

    function leaveRoom() {
        console.log(users)
        socket.emit('user:disconnect', searchParams)
        navigate('/')
    }


    const onChange = ({ target: { value } }) => {setMessage(value);}

    const onSubmit = (e) => {
        e.preventDefault()
        if (!message) return;
        socket.emit('message:add', {...searchParams, message})
        console.log({...searchParams, message})
        setMessage("")
      }


  return (
    <div>
        <div>
            <div>
               <h1>Название комнаты: {params.room}</h1>
            </div>
            <div>
            {users.map((user, i)=> (<span key={i}> {user} <br/></span>))}
            </div>
            <button onClick={leaveRoom}>Leave Room</button>
        </div>
        <div>
        {messagesList.map((item, i)=> (<span key={i} > {item.user}: {item.message}<br/></span>))}
        </div>
        <form onSubmit={onSubmit}>
            <input
                        type="text"
                        name="message"
                        placeholder='Type your text...'
                        onChange={onChange}
                        value={message}
                        required/>
    </form>
    </div>
  )
}

export default Chat
