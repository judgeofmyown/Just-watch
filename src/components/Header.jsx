import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useHref, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets';
import './Header.css'
import Search from './Search';
import { Context } from '../Context/Context';
import Profile from './Profile';


function Header() {
    const location = useLocation();
    const [menuDisplay, setMenuDisplay] = useState(false);
    const dropdownRef = useRef();
    const sideNavRef = useRef();
    const {profileDisplay, setProfileDisplay, handleProfileDisplay, setMobileProfileDisplay} = useContext(Context)
    const [showSidenav, setShowSideNav] = useState(false);
    const { isLoggedIn } = useContext(Context)
    

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
    
    function mobileMenuDisplay () {

        const sideNav = sideNavRef.current
        if(!sideNav) {
            console.log("error")
        }
        
        if (sideNav.classList.contains('hidden')) {
            sideNav.classList.remove('hidden', 'disappear');
            sideNav.classList.add('visible');
            sideNav.style.display = 'block'; // Ensure the element is displayed
        } else if (sideNav.classList.contains('visible')) {
            console.log("entered...")
            sideNav.classList.remove('visible');
            sideNav.classList.add('disappear');
            sideNav.addEventListener('animationend', () => {
                sideNav.style.display = 'none'; // Hide the element after the fadeOut animation
                sideNav.classList.add('hidden');
            }, { once: true });
        }
    }

  return (
    <>
    {
        location.pathname === "/signIn" || location.pathname === "logIn" ? null:(
            <>
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
                            <li id='login'><Link to="/Login">LogIn</Link></li>
                            <li id='register'><Link to="/Register">Register</Link></li>
                            <div className='dropdown' ref={dropdownRef}>
                                <img onClick={() => setMenuDisplay(prev => !prev)} src={assets.profile_icon} alt="profile" />
                                {
                                    (menuDisplay==true) ?(
                                        <>
                                            <div className="profile-menu">
                                                <ul>
                                                    <li className='profile-btn' onClick={() => {setProfileDisplay(prev => !prev); setMenuDisplay(prev => !prev)}}>Profile</li>
                                                    <li>Watch later</li>
                                                    <li>Favourites</li>
                                                </ul>
                                            </div>
                                        </>
                                    ):<div/>
                                }
                            </div>
                        </div>
                    <Profile/>        
                </div>
            
           
        <button onClick={mobileMenuDisplay} className="item-menu">
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
        </button>


                <div className="side-nav hidden" id='side-nav' ref={sideNavRef}>
                        <ul style={{listStyleType: 'none'}}>
                            <li id='items'><Link to="/" className="nav-items-home">Home</Link></li>
                            <li id='items'><Link to="/watch" className='nav-items-watch'>Watch</Link></li>
                            <li id='items'><Link to="/about" className='nav-items-about'>About</Link></li>
                            {
                                isLoggedIn? (<button>logout</button>):(<>
                                                                   <li id='login'><Link to="/Login">LogIn</Link></li>
                                                                   <li id='register'><Link to="/Register">Register</Link></li>
                                                                        </>)
                            }
                        </ul>
                </div>


         
        </header>
        
        </>
        )
    }

        
    </>
  )

}
export default Header