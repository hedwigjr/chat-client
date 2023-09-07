import React from 'react'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <>
    <div className={['container', styles.background].join(' ')}>
      <div className={'wrapper'}>
        <footer className={styles.footer}>
          <p className={styles.p}>Created by 🦍 ilya_khov 🦍</p>
          <p className={styles.p}>🙉 tg: @ilya_khov 🙈</p>
          <p className={styles.p}>🤓 <a href='https://github.com/ikhovanskiy'>Github: ikhovanskiy</a> 🤓</p>
        </footer>
      </div>
    </div>

    </>
  )
}
