import React, { useState } from 'react'
import styles from '../styles/CreateRoom.module.css'

export default function CreateRoom({ addRoom, currentRoom}) {
    const [newRoom, setNewRoom] = useState('');

    const handleClick = (e) =>{
        if (!newRoom || newRoom==='') {
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
            <form onSubmit={(e) => e.preventDefault()} >
                <input
                    type="text"
                    name="newRoom"
                    id ="inputNewRoom"
                    className={styles.inputNewRoom}
                    placeholder='Hit name your new room'
                    onChange={handleChange}
                    required/>
            </form>
            <button type='submit' onClick={handleClick} className={styles.btn}>
                Hit to create😡
            </button>

        </div>
    )
}
