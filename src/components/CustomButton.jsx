import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomButton({handlerClick, text}) {

  return (
    <div className="glass-btn glass-btn-red" onClick={handlerClick}>
        <Link href='' >{text}</Link>
    </div>
  )
}
