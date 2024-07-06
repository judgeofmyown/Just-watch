import React, { useContext, useState } from 'react'
import { Context } from '../Context/Context'
import "./SignIn.css"

function SignIn() {

    const {username,
            message,
            email,
            password,
            setUsername, 
            setMessage,
            setEmail, 
            setPassword, 
            handleEmail, 
            handlePassword, 
            handleUsername,
            handleSubmit
        } = useContext(Context)

  return (
    <>
    <div className='signInForm'>
         <form onSubmit={handleSubmit}>
            <label>
                <input type='text' placeholder='Username' value={username} onChange={handleUsername} required/>
            </label>
            <label>
                <input type='email' placeholder='email' value={email} onChange={handleEmail} required/>
            </label>
            <label>
                <input type='password' placeholder='password' value={password} onChange={handlePassword} required/>
            </label>
            <input type='submit' value="SignIn" className='submit-btn'/>
        </form>
        <div><h2>{message}</h2></div>
    </div>
       
    </>
  )
}

export default SignIn