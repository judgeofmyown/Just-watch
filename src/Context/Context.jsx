import React, { createContext, useState } from 'react'

const Context = createContext();

const ContextProvider = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")
    const [searchItem, setSearchItem] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const [profileDisplay, setProfileDisplay] = useState(false);
    const [loginUserName, setLoginUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logInMessage, setLoginMessage] = useState("");
    
    function handleProfileDisplay (e) {
        setProfileDisplay(prev => !prev);
    }

    function handleUsername (e) {
        setUsername(e.target.value);
    }

    function handleEmail (e) {
        setEmail(e.target.value);
    }

    function handlePassword (e) {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        const response = await fetch('http://localhost:5000/register',{
            method: 'POST',
            headers:{   
                'Content-Type':'application/json',  
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        try{
            const data = await response.json();
            if(response.status == 201){
                setMessage(data.message)
                setUsername("");
                setEmail("");
                setPassword("")
            }else if(response.status == 409)
            {
                setMessage(data.message);
                console.log(message)
            }


        }catch(e) {
            return e;
        }
        

    }

    async function handleLogInSubmit (e) {
        e.preventDefault();
        console.log("login start");

        const response = await fetch('http://localhost:5000/Login',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                username: loginUserName,
                password: loginPassword
            })
        })

        try{
            const data = await response.json();
            console.log(data)
            if(response.status == 201){
                
                console.log('Login Successfull:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username)

                setLoginUserName(data.username)
                setLoginEmail(data.email)
                setLoginMessage(data.message)
                if(data.loggedIn == true){
                    setIsLoggedIn(true);
                }

                console.log(isLoggedIn)


            }else if(response.status == 500){
                setLoginMessage(data.message);
                console.log(data.message)
            }
        }catch(e) {
            setLoginMessage("Error fetching data!")
        }

        try{


        }catch{

        }

    }

    async function fetchProtectedData() {
        const token = localStorage.getItem('token');
        if(!token) {
            console.error('No token found, user is not logged in');
            return;
        }

        try{
            const response = await fetch('http://localhost:5000/protected',{
                method: 'GET',
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });

            if(response.ok){
                const data = await response.json();
                console.log('Protected data:', data);
                return data;
            } else {
                const errorData = await response.json();
                console.error('Failed to fetch protected data:', errorData.message);
            }
        } catch (error) {
            console.log("error in fetching");
            console.error('Error:', error);
        }
    }

    const logout = () => {


        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername("Guest");
        setIsLoggedIn(false);
        console.log("logged out")
    };

    const contextValue = {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        handleUsername,
        handlePassword,
        handleEmail,
        handleSubmit,
        message,
        setMessage,
        searchItem,
        setSearchItem,
        searchClicked,
        setSearchClicked,
        profileDisplay,
        setProfileDisplay,
        handleProfileDisplay,
        loginEmail,
        loginUserName,
        setLoginUserName,
        setLoginEmail,
        setLoginPassword,
        handleLogInSubmit,
        fetchProtectedData,
        isLoggedIn,
        setIsLoggedIn,
        logout,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}; 
