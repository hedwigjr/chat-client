import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import { useAutorise } from '../../hooks/useAutorise';
import Header from '../../components/Header';

import styles from './styles/UserPage.module.css'
import Footer from '../../components/Footer';
import { validatePass } from '../../helpers/validatePass';
import CustomButton from '../../components/CustomButton';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, sendEmailVerification,  updatePassword } from 'firebase/auth';

import Modal from '../../components/Modal';
import {BsPencil} from 'react-icons/bs'
import {AiOutlineSetting} from 'react-icons/ai'
export default function UserPage() {

  const [errorMessage, setErrorMessage] = useState('')
  const [newPass, setNewPass] = useState('')
  const [passBtn, setPassBtn] = useState('Готово')
  const [loading, setLoading] = useState(true)

  const [correctingUserData, setCorrectingUserData] = useState(false)

  const auth = getAuth();

  useAutorise()


  useEffect(() => {
    auth.onAuthStateChanged(firebaseUser => {
      setLoading(false);
    });
  })

  const login = 'Мартышка Волосатая'
  const selfDescribe = 'Обезьян дефолтный, на главу прайда не претендует'

  const changePasswordInput = (e) => {
    if (!validatePass(e.target.value)){
      setErrorMessage('Невалидный пароль')
      return
    }
    setNewPass(e.target.value)
    setErrorMessage('')
  }

  const changePassword = () => {
    if(!validatePass(newPass)) return
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      prompt('Введи пароль!')
    )
    reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            setPassBtn('Loading...')
          updatePassword(auth.currentUser, newPass).then(() => {
            setPassBtn('Ok')
            setErrorMessage('')
          }).catch((error) => {
            console.log(error.message)
            setPassBtn('Error')
          });
    }).catch((error) => {
      console.log(error.message)
      setErrorMessage('Пароль не верный!')
    });
    
    
  }
  const [btmVerifyEmail, setBtmVerifyEmail] = useState('Отправить')
  
  const verifyEmail = () => {
    setBtmVerifyEmail('Loading...')
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setBtmVerifyEmail('Отправили')
      })
      .catch((error)=>{
        setBtmVerifyEmail('Error')
      })
  }

  const [isModalActive, setModalActive] = useState(false);

  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };
  const handleCorrectData = () => {
    (correctingUserData) ? setCorrectingUserData(false) : setCorrectingUserData(true)
  }

  return loading ? (
    <div className={styles.container}>
        <Loader/> 
    </div>
  ) :  (
    <div className={styles.container}>
          <Header/> 
          <div className='container'>
            <div className='wrapper'>
              <div className={styles.wrapper}>
                
                <div className={styles.img} ></div>
                <div className={styles.settingsBar}>
                  <BsPencil className={styles.setting} onClick={handleCorrectData}/>
                  <AiOutlineSetting className={styles.setting} onClick={handleModalOpen}/>
                </div>
                
                
                <div>
                  <h5><b>По паспорту:</b></h5>
                  <div className={styles.userName}>
                    {correctingUserData && <input type="text" name="text" defaultValue={login}/>}
                    {!correctingUserData && <h5 className={styles.text}>{login}</h5>}
                    
                    
                  </div>
                  
                </div>
                <div className={styles.selfDescribe}>
                  <h5><b>О себе:</b></h5>
                  {!correctingUserData && <h5 className={styles.text}>{selfDescribe}</h5>}
                  {correctingUserData &&<textarea name="textarea" className={styles.textarea} defaultValue={selfDescribe}/>}
                 
                </div>
              </div> 
              
              {isModalActive &&<Modal title="" onClose={handleModalClose}>
                <div>
                  <div>
                    <h4 className={styles.emailText}>{auth.currentUser.email}</h4>
                    {!auth.currentUser.emailVerified && 
                    <div className={styles.flex}>
                      <h4>Подтвердить почту</h4>
                      <CustomButton handlerClick={verifyEmail} text={btmVerifyEmail}/>
                    </div>}
                  </div>
                  <div>
                      <h4>Обновить пароль:</h4>
                      <div className={styles.flex}>
                        <input type="text" name="password" placeholder="Password" onChange={changePasswordInput}/>
                        <div>
                        <CustomButton handlerClick={changePassword} text={passBtn}/>
                      </div>
                      
                      
                    </div>
                    <p className={styles.errorMessage}>{errorMessage}</p>
                  </div>
                </div>
              </Modal>}
              
              
              
            </div>  
          </div>    
          
          <Footer/>
    </div>
  ) 
}
