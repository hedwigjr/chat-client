import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import io from 'socket.io-client'
import { URL_API } from '../config'

import styles from '../styles/UserRooms.module.css'

const socket = io.connect(URL_API)

export default function UserRooms({user, rooms, currentRoom}) {
    const handleClick = (e) =>{
        currentRoom(e.target.value)
    }
    return (
        <>
            <h4 className={styles.text}>Your rooms:</h4>
            <div className={styles.rooms}>
                { rooms.map((room,i)=> {
                    if(room!='')
                    return(
                    <button key={i} type='submit' value={room} onClick={handleClick} className={styles.btn}>
                        {room}
                    </button>)

                    }
                    )
                }
            </div>
        </>
    )
}
