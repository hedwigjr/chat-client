import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../styles/Header.module.css'

export default function Header({user}) {
  return (
    <>
          <header className={styles.header}>
              <h4 className={styles.user}>Mr.boss {user}🦍</h4>
              <Link to={`/`} className={styles.link}>
                <button type='submit' className={styles.btn}>
                🤢 Log out 🤢
                </button>
              </Link>
          </header>
    </>
  )
}
