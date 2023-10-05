import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from '../styles/Header.module.css'
import {  useSelector } from 'react-redux'
import CustomButton from './CustomButton'
import { getAuth, signOut } from 'firebase/auth'

export default function Header() {
  const user = useSelector((state)=> state.user.data)
  const navigate = useNavigate()

  const handleClick = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error)
    });
    
  }

  return (
    <>
    <div className={['container', styles.background].join(' ')}>
      <div className='wrapper'>
          <header className={styles.header}>
              <Link to='/user'><h4 className={styles.user}>{`Mr.boss ${ user.login ? user.login : '' }🦍`}</h4></Link>
              {/* <Link to=''>Лента</Link>
              <Link to=''>Друзья</Link>
              <Link to=''>Сообщества</Link> */}
              <Link to='/chat'>Чат</Link>
              <CustomButton handlerClick = {handleClick} text = {`🤢Выйти🤢`}/>
          </header>
      </div>
    </div>

    </>
  )
}
