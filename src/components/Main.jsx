import React ,{ useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Main.module.css'

import io from 'socket.io-client'
import { URL_API } from '../config'

const socket = io.connect(URL_API)

function Main() {
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUser(e.target.value)
    }

    const handleClick = (e) =>{
        if (!user) e.preventDefault()
        socket.emit('user:add', {name: user, room:'default'})
    }
    const handleSubmit = (e) =>{
        if (!user) e.preventDefault()
        socket.emit('user:add', {name: user, room:'default'})
        navigate(`/chat?name=${user}`)
    }

  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <h2>Log In </h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="username"
                    placeholder='Username'
                    onChange={handleChange}
                    className={styles.input}
                    required/>
            </form>
            <Link to={`/chat?name=${user}`}>
                    <button type='submit' onClick={handleClick} className={styles.btn}>
                        Go!
                    </button>
            </Link>
        </div>
    </div>
  )
}

export default Main
