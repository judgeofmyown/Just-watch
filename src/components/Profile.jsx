import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context'
import "./Profile.css"
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';



function Profile() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const {profileDisplay, setProfileDisplay, loginUserName, loginEmail, fetchProtectedData, isLoggedIn, setIsLoggedIn, logout} = useContext(Context);
    useEffect(() => {
        const getData = async () => {
          try {
            const protectedData = await fetchProtectedData();
            setData(protectedData);
          } catch (err) {
            setError(err.message);
          }
        };
        
        getData();
      }, []);

      


  return (
    <>
        {   
            profileDisplay?
            (<div className='user-profile'>
                <button className='close-btn' onClick={() => {setProfileDisplay(prev => !prev)}}><img src={assets.Previous_icon}/></button>
                <div className="profile-header">
                    <img src={assets.profile_icon} alt="profile" />
                </div>
                <h4>{isLoggedIn?
                        (data?.logged_in_as?.username ?? '-Guest-'):(<h4>-Guest-</h4>)  
                    }
                    <br/>
                    {
                        isLoggedIn?
                        (data?.logged_in_as?.email ?? 'Not logged in'):(<h4><Link to="/register">signin</Link> or <Link to="/Login">login</Link></h4>)
                    }</h4>
                <hr/>
                <button onClick={logout}>logout</button>
            </div>):null
        }
    </>
  )
}

export default Profile