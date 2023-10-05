import React ,{ useState }  from 'react'
import { Link  } from 'react-router-dom'


// import io from 'socket.io-client'

import CustomButton from '../../components/CustomButton'
import { useAutorise } from '../../hooks/useAutorise'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import BananaPack from './components/BananaPack'
import { validateEmail } from '../../helpers/validateEmail'
import { validatePass } from '../../helpers/validatePass'


// const socket = io.connect(URL_API)

function AuthorizationPage() {
    
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [forgotPassword, setforgotPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [btnMessage, setBtnMessage] = useState('Войти')

    const handleChangeEmail= (e) => setEmail(e.target.value)

    const handleChangePassword = (e) => setPassword(e.target.value)

    const handleForgotPassword = () => {
        setEmail('')
        setErrorMessage('')
        setBtnMessage('Отправить')
        setforgotPassword(true)
    }

    
    // socket.emit('user:add', {name: user, room:'default'})
    const auth = getAuth();

    useAutorise()
    
    
    

    const logInUser = () => { 
        if (!validateEmail(email)){
            setErrorMessage('Не валидный email')
            return
        }
        if (!validatePass(password)){
            setErrorMessage('Не валидный пароль')
            return
        }
        setBtnMessage('Loading...')
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Зашел')
            })
            .catch((error) => {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((user) => {
                        console.log('Зарегался')
                    })
                    .catch((error) => {
                        // const errorCode = error.code;
                        // const errorMessage = error.message;
                        // setErrorMessage(errorMessage)
                        setBtnMessage('Войти')
                        setErrorMessage('Пароль: Неверный☝️')
                    });
                // const errorCode = error.code;
                // const errorMessage = error.message;
                
         });
    }
    const sendPassword = () => {
        if (!validateEmail(email)){
            setErrorMessage('Не валидный email')
            return
        }
        setBtnMessage('Loading...')
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorMessage('Смотри почту')
                setBtnMessage('Отправить')
                setforgotPassword(false)
            })
            .catch((error) => {
                setBtnMessage('Error')
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..
            });
    }
    const handleBack = () => {
        setforgotPassword(false)
        setBtnMessage('Войти')
    }

  return forgotPassword ? (
    <>
        <BananaPack />
        <div className="content">               
            <form>
                <h3>Забыл пароль?</h3>
                <h4>Ну вводи email...</h4>
                <input type="text" name="Email" placeholder="Email" onChange={handleChangeEmail}/>
            </form>
            <div>
                <CustomButton handlerClick={handleBack} text={'Назад'}/>
                <CustomButton handlerClick={sendPassword} text={btnMessage}/>
            </div>
            
            <div className="error_message">
                <p>{errorMessage}</p>
            </div>
        </div>
    </>
  ) : (
    <>
        <BananaPack />
        <div className="content">
            <form>
                <h1>О, привет🖐</h1>
                <input type="text" name="Email" placeholder="Email" onChange={handleChangeEmail}/>
                <input type="password" name="password" placeholder="Password" onChange={handleChangePassword}/>
                <Link onClick={handleForgotPassword}>Я забыл пароль😭</Link>
            </form>
            <CustomButton handlerClick={logInUser} text={btnMessage}/>
            <div className="error_message">
                <p>{errorMessage}</p>
            </div>
        </div>
    </>
  )
}

export default AuthorizationPage
