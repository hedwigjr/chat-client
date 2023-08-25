import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Main.module.css'

const FIELDS = {
    USERNAME: "username",
    ROOM: "room"
}


function Main() {
    const {USERNAME, ROOM} = FIELDS;

    const [values, setValues] = useState({[USERNAME]:"", [ROOM]:""});

    const handleChange = ({target : {value, name}}) => {
        setValues({...values,[name]:value})
    }

    const handleClick = (e) =>{
        const isDisabled = Object.values(values).some(value => !value)
        if (isDisabled) e.preventDefault()
    }

  return (
    <div className={styles.wrap}>
        <div className={styles.container}>
            <h1>Привет!</h1>
            <form>
                <input
                    type="text"
                    name="username"
                    value={values[USERNAME]}
                    placeholder='Username'
                    onChange={handleChange}
                    required/>
                <input
                    type="text"
                    name="room"
                    value={values[ROOM]}
                    placeholder='Room'
                    onChange={handleChange}
                    required/>
                <Link to={`/chat?name=${values[USERNAME]}&room=${values[ROOM]}`} onClick={handleClick}>
                    <button type='submit'>
                        Войти
                    </button>
                </Link>
            </form>

        </div>
    </div>
  )
}

export default Main
