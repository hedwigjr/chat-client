import React from 'react'
import styles from '../styles/Message.module.css'

export default function Message({messageMeta, currentUser}) {
  let user = messageMeta.user
  let message = messageMeta.message
  if (user === 'Admin') {
    message = message.split(' ')
    user = message.shift()
    message = message.join(' ')
    return (
        <div className={[styles.wrapper, styles.center].join(' ')}>
            <div className={styles.conteiner}>
                <span><b>{user} </b>{message}</span>
            </div>
            
        </div>
      )
  } else if( user === currentUser){
    return (
        <div className={[styles.wrapper, styles.right].join(' ')}>
            <div className={styles.conteiner}>
                <span>{message}</span>
            </div>
        </div>
      )
  } else {
    return (
        <div className={[styles.wrapper, styles.left].join(' ')}>
            <div className={styles.conteiner}>
                <span><b>{user}:</b> </span>
                <br/>
                <span>{message}</span>
            </div>
            
        </div>
      )
  }
  
}
