import React from 'react'
import SignIn from '../components/SignIn'
import LogIn from '../components/LogIn'

function Register() {
  return (
    <>
        <div className="register">
            <div className="signIn">
                <SignIn/>
            </div>
            <div className="logIn">
                {/* <LogIn/> */}
            </div>
        </div>
    </>
  )
}

export default Register