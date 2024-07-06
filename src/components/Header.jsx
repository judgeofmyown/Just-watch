import React, { useEffect, useRef, useState } from 'react'
import { Link, useHref, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets';
import './Header.css'
import Search from './Search';


function Header() {
    const location = useLocation();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const dropdownRef = useRef()

    useEffect(() => {
        // Function to handle clicks outside the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuDisplay(false);
            }
        };

        // Attach event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    function toggleMenuDisplay() {
                if(menuDisplay){
                    setMenuDisplay( prev => !prev);
                }
            }


  return (
    <>
    {
        location.pathname === "/signIn" || location.pathname === "logIn" ? null:(
        <header>
                <div className="logo">
                    <img src={assets.logo_icon} alt="logo" />
                </div>
                <div className="nav-Items">
                        <ul>
                            <li id='items'><Link to="/" className="home">Home</Link></li>
                            <li id='items'><Link to="/watch" className='watch'>Watch</Link></li>
                            <li id='items'><Link to="/about" className='about'>About</Link></li>
                        </ul>
                        <div className="profile">
                            <li id='register'><Link to="/Register">Register</Link></li>
                            <div className='dropdown' ref={dropdownRef}>
                                <img onClick={() => setMenuDisplay(prev => !prev)} src={assets.profile_icon} alt="profile" />
                                {
                                    menuDisplay?(
                                        <>
                                            <div className="profile-menu">
                                                <ul>
                                                    <li><Link to="/profile">Profile</Link></li>
                                                    <li>Watch later</li>
                                                    <li>Favourites</li>
                                                </ul>
                                            </div>
                                        </>
                                    ):<div/>
                                }
                            </div>
                        </div>
                        
                </div>
            
            
        </header>

        )
    }

        
    </>
  )

}
export default Header