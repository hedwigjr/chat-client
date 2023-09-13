import React from 'react'


import styles from '../styles/UserRooms.module.css'


export default function UserRooms({user, rooms, currentRoom}) {
    const handleClick = (e) =>{
        currentRoom(e.target.value)
    }
    return (
        <>
            <h4 className={styles.text}>Your rooms:</h4>
            <div className={styles.rooms}>
                {!!rooms && rooms.map((room,i) => {
                    if(room !=='' && !!room) { return (
                    <button key={i} type='submit' value={room} onClick={handleClick} className={styles.btn}>
                        {room}
                    </button>) } else {return null}
                    }
                    )
                }
            </div>
        </>
    )
}
