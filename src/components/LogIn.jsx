import React, { useContext } from 'react'
import { Context } from '../Context/Context'

function LogIn() {

  const {username,
    password,
    setPassword, 
    handleLogInSubmit, 
    loginEmail, 
    loginUserName, 
    setLoginEmail, 
    setLoginUserName, 
    loginPassword, 
    setLoginPassword,
    logInMessage,
    setLoginMessage,
    message,
    setMessage
  } = useContext(Context)



  return (
    <>
        <div className='signInForm'>
         <form>
            <label>
              <input type='text' placeholder='username' value={loginUserName} onChange={(e) => setLoginUserName(e.target.value)} required/>
            </label>
            <label>
              <input type='password' placeholder='password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required/>
            </label>
            <input onClick={handleLogInSubmit} type='submit' value="Login" className='submit-btn'/>
        
        </form><div><h2>{logInMessage}</h2></div>
    </div>
    </>
  )
}

export default LogIn