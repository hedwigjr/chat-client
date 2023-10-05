import React from 'react'
import '../styles/Banana.module.css'

export default function Banana({i}) {
  let classBanana
  switch (i){
    case 1: 
        classBanana = "banana speed0_5"
        break
    case 2: 
        classBanana = "banana speed1"
        break
    case 3: 
        classBanana = "banana speed1_5"
        break  
    case 4: 
        classBanana = "banana speed2"
        break    
    case 5: 
        classBanana = "banana speed3"
        break 
    case 6: 
        classBanana = "banana speed4"
        break
    default:
        classBanana = "banana speed0_5"
  }
    
  return (
    <div className={classBanana}>
        <div className="pos-x">
            <div className="pos-y">
                <div className="form">
                
                </div>   
            </div>
        </div>
    </div>
)
}
