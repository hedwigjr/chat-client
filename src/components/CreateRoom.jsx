import React, { useState } from 'react'
import { Socket } from 'socket.io-client';

import io from 'socket.io-client'
import { URL_API } from '../config'

const socket = io.connect(URL_API)

export default function CreateRoom({user, addRoom, currentRoom}) {
    const [newRoom, setNewRoom] = useState('');

    const handleClick = (e) =>{
        if (!newRoom || newRoom=='') {
            e.preventDefault()
            return}
        addRoom(newRoom)
        currentRoom(newRoom)
        document.querySelector("#inputNewRoom").value = ''
        setNewRoom('')
    }

    const handleChange = (e) => {
        setNewRoom(e.target.value)
    }

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="newRoom"
                    id ="inputNewRoom"
                    placeholder='Hit name your new room'
                    onChange={handleChange}
                    required/>
            </form>
            <button type='submit' onClick={handleClick}>
                            Hit to create😡
            </button>

        </div>
    )
}
