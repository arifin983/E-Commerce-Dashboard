import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
const SignUp = () => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }

    })



    const collectData = async() => {
        console.log(name,email, password)
        let result = await fetch("http://localhost:4000/register",{
            method:"post",
            body:JSON.stringify({name, email, password}),
            headers:{
                "Content-Type":"application/json"
            },
           
        });
        result = await result.json();
        console.warn(result)
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result){
            navigate("/");
        };
    };
    return(
        <div className="register">
            <h1>Register</h1>
            <form className="form">
                <input type="text" className="inputBox" placeholder="name" value={name} onChange={(event) => setName(event.target.value)}/>
                <input type="email" className="inputBox" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                <input type="password" className="inputBox" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                <button className="inputButton" type="button" onClick={collectData}>Sign Up</button>
            </form>
        </div>
    )
};
export default SignUp;