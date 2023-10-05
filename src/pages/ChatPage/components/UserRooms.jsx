import React from 'react'


import styles from '../styles/UserRooms.module.css'


export default function UserRooms({currentRoom, rooms, setCurrentRoom, handlerChangeClass}) {
    const handleClick = (e) =>{
        setCurrentRoom(e.target.value)
        handlerChangeClass()
    }
    return (
        <>
            <h4 className={styles.text}>Your rooms:</h4>
            <div className={styles.rooms}>
                {!!rooms && rooms.map((room,i) => {
                    if(room !=='' && !!room) { 
                        if(room === currentRoom){
                            return (
                                <button key={i} type='submit' value={room} onClick={handleClick} className={[styles.btn, styles.current].join(' ')}>
                                    {room}
                                </button>)
                        } else return (
                                <button key={i} type='submit' value={room} onClick={handleClick} className={styles.btn}>
                                    {room}
                                </button>) } 
                    else {return null}
                    }
                    )
                }
            </div>
        </>
    )
}
