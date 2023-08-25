import React, { useState } from 'react'

const Test = () => {
const [message, setMessage] = useState("");
const [messagePool, setMessagePool] = useState([
    {currentMessage: ""},
]);

const handleChange = ({ target: { value } }) => {setMessage( value);}
const onSubmit = (e) => {
    e.preventDefault()
    setMessagePool([...messagePool,{currentMessage: message}])
    setMessage("")
  }
  return (
    <div>

    <form onSubmit={onSubmit}>
            <input
                        type="text"
                        name="message"
                        placeholder='Type your text...'
                        onChange={handleChange}
                        value={message}
                        required/>
    </form>
    {messagePool.map(({currentMessage}, i)=> (<span key={i}> {currentMessage} <br/></span>))}
    </div>
  )
}

export default Test



