import React, { createContext, useState } from 'react'

const Context = createContext();

const ContextProvider = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")
    const [searchItem, setSearchItem] = useState("");
    const [searchClicked, setSearchClicked] = useState(false)

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
        setSearchClicked
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export {Context, ContextProvider}; 
