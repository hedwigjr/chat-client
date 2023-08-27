import React ,{ useState }  from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Main.module.css'

import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000/')

function Main() {
    const [user, setUser] = useState('');

    const handleChange = (e) => {
        setUser(e.target.value)
    }

    const handleClick = (e) =>{
        if (!user) e.preventDefault()
        socket.emit('user:add', {name: user, room:'default'})
    }

  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <h1>Log In </h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="username"
                    placeholder='Username'
                    onChange={handleChange}
                    required/>
            </form>
            <Link to={`/chat?name=${user}`}>
                    <button type='submit' onClick={handleClick}>
                        Go!
                    </button>
            </Link>
        </div>
    </div>
  )
}

export default Main
