import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUid } from '../store/slices/user.slice'

export function useAutorise(){
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const auth = getAuth()
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              if(location.pathname === '/') navigate('/user')
              console.log("Уже авторизирован")
              dispatch(setUid(user.uid))
            } else {
              navigate('/') 
              console.log("Не авторизирован")
            }
          });
    },[]) // eslint-disable-line
   
}