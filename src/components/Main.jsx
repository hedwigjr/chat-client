import React ,{ useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Main.module.css'

import io from 'socket.io-client'
import { URL_API } from '../config'

const socket = io.connect(URL_API)

function Main() {
    const [user, setUser] = useState('');

    const [warning, setWarnig] = useState(false)

    const navigate = useNavigate();
    const handleChange = (e) => {
        setUser(e.target.value)
    }


    const validateUserName = (user) => {
        user = user.toString().toLowerCase()
        const vowels = "qwertyuiopasdfghjklzxcvbnm1234567890"
        for(const el of user){
            if(!vowels.includes(el) ) {
                setWarnig(true)
                return false}
        }
        if (user.length>3) {return true} else {
            setWarnig(true)
            return false}
    }
    
    const handleClick = (e) =>{
        (!user || !validateUserName(user)) ? e.preventDefault() :
        socket.emit('user:add', {name: user, room:'default'})
    }
    const handleSubmit = (e) =>{
        if (!user || !validateUserName(user)) {e.preventDefault()} else{
            socket.emit('user:add', {name: user, room:'default'})
            navigate(`/chat?name=${user}`)
        }
        
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
                    />
            </form>
            {warning && <div>Length name must be more than 3 <br/> 
            Only EN and numbers</div>}
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
